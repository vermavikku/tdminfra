// In-memory replacement for Supabase used by the app for local/static data mode.
// This provides a minimal supabase-like API for the specific calls used across the codebase:
// - supabase.from('machinery').select('*').eq('featured', true).limit(3) -> returns data
// - supabase.from('machinery').select('*').order('name')
// - supabase.from('enquiries').insert([...])
// - supabase.from('contact_submissions').insert([...])
// The implementation is intentionally tiny and synchronous (wrapped in promises) to
// avoid changing the app's async/await usage.

import { sampleMachinery } from "./seedData";

export type Machinery = {
  id: string;
  name: string;
  type: string;
  description: string;
  image_url: string;
  specs: Record<string, string>;
  price_per_day: number;
  is_available: boolean;
  featured: boolean;
  created_at: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  machine_type: string;
  message: string;
  status: string;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

// Local in-memory stores
const db = {
  machinery: [] as Machinery[],
  enquiries: [] as Enquiry[],
  contact_submissions: [] as ContactSubmission[],
};

// Initialize machinery from sample data, adding ids and timestamps
function init() {
  if (db.machinery.length > 0) return;
  const now = new Date().toISOString();
  db.machinery = sampleMachinery.map((m, i) => ({
    id: `m-${i + 1}`,
    created_at: now,
    price_per_day: m.price_per_day,
    is_available: !!m.is_available,
    featured: !!m.featured,
    specs: (m.specs || {}) as unknown as Record<string, string>,
    image_url: m.image_url,
    description: m.description,
    name: m.name,
    type: m.type,
  }));
}

init();

// Minimal query builder that supports the small subset used in the app
function from(table: "machinery" | "enquiries" | "contact_submissions") {
  // rows referenced by chainable API
  let rows: any[] = db[table];

  const api: any = {
    select: () => {
      // reset rows snapshot for this chain
      rows = [...db[table]];

      const chain = {
        eq: (key: string, value: any) => {
          rows = rows.filter((r) => r[key] === value);
          return chain;
        },
        order: (key: string, opts?: { ascending?: boolean } | string) => {
          const ascending =
            opts === "asc" || (opts && (opts as any).ascending !== false);
          rows = [...rows].sort((a, b) => {
            if (a[key] < b[key]) return ascending ? -1 : 1;
            if (a[key] > b[key]) return ascending ? 1 : -1;
            return 0;
          });
          return chain;
        },
        limit: (n: number) => {
          rows = rows.slice(0, n);
          return chain;
        },
        then: (resolve: any) => {
          return Promise.resolve({ data: rows, error: null }).then(resolve);
        },
        thenReturn: () => Promise.resolve({ data: rows, error: null }),
        execute: () => Promise.resolve({ data: rows, error: null }),
      };

      return chain;
    },
    insert: (items: any[]) => {
      const now = new Date().toISOString();
      if (table === "enquiries") {
        const inserted = items.map((it, idx) => {
          const obj: Enquiry = {
            id: `e-${db.enquiries.length + idx + 1}`,
            name: it.name,
            email: it.email,
            phone: it.phone,
            machine_type: it.machine_type,
            message: it.message,
            status: "new",
            created_at: now,
          };
          db.enquiries.push(obj);
          return obj;
        });
        return Promise.resolve({ data: inserted, error: null });
      }

      if (table === "contact_submissions") {
        const inserted = items.map((it, idx) => {
          const obj: ContactSubmission = {
            id: `c-${db.contact_submissions.length + idx + 1}`,
            name: it.name,
            email: it.email,
            phone: it.phone,
            message: it.message,
            created_at: now,
          };
          db.contact_submissions.push(obj);
          return obj;
        });
        return Promise.resolve({ data: inserted, error: null });
      }

      const inserted = items.map((it, idx) => {
        const obj: Machinery = {
          id: `m-${db.machinery.length + idx + 1}`,
          created_at: now,
          price_per_day: it.price_per_day || 0,
          is_available: !!it.is_available,
          featured: !!it.featured,
          specs: (it.specs || {}) as unknown as Record<string, string>,
          image_url: it.image_url || "",
          description: it.description || "",
          name: it.name || "Unnamed",
          type: it.type || "unknown",
        };
        db.machinery.push(obj);
        return obj;
      });
      return Promise.resolve({ data: inserted, error: null });
    },
  };

  return api;
}

export const supabase = {
  from,
};

// Expose the in-memory db for debugging/inspection if needed
export const _IN_MEMORY_DB = db;
