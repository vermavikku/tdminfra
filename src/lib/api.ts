// API client for tdminfra-user to communicate with tdminfra-backend

const API_BASE = import.meta.env.VITE_TDMINFRA_BACKEND_URL ?? 'http://localhost:3000';

export interface Machinery {
  id: number;
  title: string;
  status: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

interface ApiResponse {
  data: Machinery[];
  total: number;
  page: number;
  limit: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  title?: string;
  status?: string;
}

interface Profile {
  id: number;
  phones: string[];
  emails: string[];
  address?: string;
  business_hours?: any;
  logo_url?: string;
  created_at: string;
  updated_at?: string;
}

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  machine_type?: string;
  message?: string;
  machinery_id?: number;
}

async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
    ...opts,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export async function getFeaturedMachineries(limit: number = 3): Promise<Machinery[]> {
  // Get all machineries and filter for active ones
  const response: ApiResponse = await request('/machineries?limit=100');
  
  // Filter active machineries and limit the result
  const activeMachineries = response.data.filter((m: Machinery) => m.status === 'ACTIVE');
  return activeMachineries.slice(0, limit);
}

export async function getAllMachineries(params: PaginationParams = {}): Promise<ApiResponse> {
  const { page = 1, limit = 12, title = '', status = '' } = params;
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  if (title) {
    queryParams.append('title', title);
  }
  
  if (status && status !== 'all') {
    queryParams.append('status', status.toUpperCase());
  }
  
  const response = await request(`/machineries?${queryParams.toString()}`);
  return response;
}

export async function getProfile(): Promise<Profile | null> {
  try {
    // Get the first profile (assuming single profile setup)
    const response = await request('/profiles');
    if (Array.isArray(response) && response.length > 0) {
      return response[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function submitEnquiry(enquiryData: EnquiryData): Promise<void> {
  await request('/enquiries', {
    method: 'POST',
    body: JSON.stringify(enquiryData),
  });
}

// Helper function to get full image URL
export function getFullImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return 'https://via.placeholder.com/400x300?text=Machinery';
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) return imageUrl;
  // Otherwise, concatenate with API base
  return `${API_BASE}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
}

export default {
  getFeaturedMachineries,
  getAllMachineries,
  getProfile,
  submitEnquiry,
  getFullImageUrl,
};
