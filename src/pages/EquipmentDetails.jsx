import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CircularLoader from "../components/common/Loader/CircularLoader";
import { equipmentCards } from "../data/siteData";
import { assetUrl, fetchJson } from "../lib/api";
import { slugify } from "../lib/assets";
import { htmlToText, stripLeadingHeading } from "../lib/html";

const categoryLabel = {
  Crane: "Crane",
  "Boom lift": "Boom Lift",
  "Truck Mounted Lift": "Truck Mounted Lift",
};

const isNumericId = (value) => /^\d+$/.test(String(value || "").trim());

const getLegacyContent = (card) => {
  if (card.slug === "20-ton-small-mini-boom-truck-crane") {
    return {
      title: "Small Mini Boom Truck Crane for Rent",
      subtitle: "Truck Crane | Sany | 20 to 40 ton",
      overview: [
        "SANY truck crane features high stability, driving flexibility, high lifting performance, and a simple structure with strong efficiency for demanding jobs.",
        "The adjustable hydraulic system and intelligent electric control system help the machine stay productive on tight sites while keeping fuel use under control.",
      ],
      sections: [
        {
          title: "Excellent and Stable Chassis Performance/Chassis System",
          paragraphs: [
            "Double-axle drive helps deliver reliable travel performance and comfortable handling under complex road conditions.",
            "The power output system is designed to reduce consumption while keeping the truck crane ready for heavy-duty project movement.",
          ],
          points: [
            "Good traffic-ability for live sites and compound movement",
            "Balanced stability for lift operations and site transition",
            "Reliable travel performance across mixed surfaces",
          ],
        },
        {
          title: "Safe, Stable, Advanced and Intelligent Control System",
          paragraphs: [
            "The self-developed SYMC controller is configured for engineering machinery and supports dependable machine control.",
            "CAN-bus digital network control technology keeps signal transfer stable and helps simplify the harness while improving reliability.",
          ],
          points: [
            "Stable electronic control architecture",
            "Simplified wiring and improved maintainability",
            "Designed for safer, more predictable lifting support",
          ],
        },
      ],
    };
  }

  const label = categoryLabel[card.category] || card.category;
  const capacity = card.title.match(/\b\d+\s?(?:ft|ton)\b/i)?.[0];
  const genericIntro =
    card.category === "Crane"
      ? [
          `${card.title} is suited for heavy industrial lifts, shutdown support, and infrastructure work where dependable lifting capacity matters.`,
          "Its stable setup and practical site handling make it a strong fit for projects that need a rugged machine with consistent performance.",
        ]
      : card.category === "Boom lift"
        ? [
            `${card.title} is built for elevated access work, helping crews reach facades, plant assets, and maintenance points with confidence.`,
            "The telescopic platform design supports clean reach, quick positioning, and efficient work across commercial and industrial sites.",
          ]
        : [
            `${card.title} combines mobility and lifting support for projects that need quick deployment and flexible movement between work areas.`,
            "It is a practical choice for sites that need a compact machine with dependable access capabilities and easy setup.",
          ];

  return {
    title: `${card.title} for Rent`,
    subtitle: `${label}${capacity ? ` | ${capacity}` : ""} | Reliable rental support`,
    overview: [card.detail, ...genericIntro],
    sections: [
      {
        title: `Key strengths of this ${label.toLowerCase()}`,
        paragraphs: [
          "Built to support day-to-day project demands with a focus on stability, ease of deployment, and site-ready efficiency.",
          "The machine layout is practical for crews that need dependable performance without adding unnecessary setup complexity.",
        ],
        points: [
          "Strong site usability",
          "Efficient deployment on active projects",
          "Designed for rental-ready operations",
        ],
      },
      {
        title: "Typical applications",
        paragraphs: [
          "Used across industrial maintenance, construction, plant shutdowns, utilities, and infrastructure jobs that need a dependable lifting solution.",
          "Talk to the team if you want help matching the right machine to reach, capacity, and site access requirements.",
        ],
      },
    ],
  };
};

const EquipmentDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [machine, setMachine] = useState(null);
  const [categories, setCategories] = useState(new Map());
  const [legacyCard, setLegacyCard] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const loadDetails = async () => {
      setLoading(true);
      setMachine(null);
      setLegacyCard(null);
      setNotFound(false);

      if (!isNumericId(id)) {
        const card = equipmentCards.find((item) => item.slug === id);
        if (cancelled) {
          return;
        }

        setLegacyCard(card || null);
        setNotFound(!card);
        setLoading(false);
        return;
      }

      try {
        const [machineResponse, categoriesResponse] = await Promise.all([
          fetchJson(`/machineries/${id}`, { signal: controller.signal }),
          fetchJson("/categories/dropdown/list", {
            signal: controller.signal,
          }).catch(() => null),
        ]);

        if (cancelled) {
          return;
        }

        const categoryList = Array.isArray(categoriesResponse?.data)
          ? categoriesResponse.data
          : [];
        setCategories(
          new Map(
            categoryList.map((category) => [category.code, category.name]),
          ),
        );
        setMachine(machineResponse);
      } catch {
        if (!cancelled) {
          setNotFound(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]);

  const machineView = useMemo(() => {
    if (!machine) {
      return null;
    }

    const title = String(machine.title || "").trim() || "Untitled Equipment";
    const fallbackCard = equipmentCards.find(
      (item) => item.slug === slugify(title),
    );
    const categoryCode = String(machine.category_code || "").trim();
    const categoryName =
      categories.get(categoryCode) ||
      categoryLabel[categoryCode] ||
      fallbackCard?.category ||
      categoryCode ||
      "Equipment";
    const image = assetUrl(
      machine.image_url || fallbackCard?.image || "/logo/tdm-logo.jpeg",
    );
    const descriptionHtml = String(machine.description || "").trim();
    const descriptionHtmlDisplay = stripLeadingHeading(descriptionHtml);
    const descriptionText = htmlToText(descriptionHtml);

    return {
      ...machine,
      title,
      categoryCode,
      categoryName,
      image,
      descriptionHtml,
      descriptionHtmlDisplay,
      descriptionText,
      fallbackCard,
    };
  }, [categories, machine]);

  if (loading) {
    return <CircularLoader label="Loading equipment details" />;
  }

  if (notFound) {
    return <Navigate to="/equipments" replace />;
  }

  if (legacyCard) {
    const content = getLegacyContent(legacyCard);

    return (
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            to="/equipments"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors mb-6 animate-fade-up"
          >
            <span>←</span>
            <span>Back to Equipments</span>
          </Link>

          <article className="border border-slate-200/80 bg-white rounded-2xl shadow-xl shadow-slate-900/8 overflow-hidden animate-fade-up">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-sky-50 p-6 flex items-center justify-center">
                <img
                  src={legacyCard.image}
                  alt={legacyCard.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-sm font-semibold w-fit">
                  {legacyCard.category}
                </span>
                <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  {content.title}
                </h1>
                <p className="mt-2 text-base text-slate-600">
                  {content.subtitle}
                </p>

                <div className="mt-6">
                  <Link
                    to={`/contact?equipmentSlug=${encodeURIComponent(legacyCard.slug)}`}
                    className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
                    style={{ color: "#fff" }}
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/80" />

            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Equipment Overview
              </h2>
              <div className="space-y-4 mb-8">
                {content.overview.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base text-slate-600 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {content.sections.map((section) => (
                <section key={section.title} className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {section.title}
                  </h3>
                  {section.paragraphs?.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base text-slate-600 leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.points ? (
                    <ul className="space-y-2 list-disc list-inside text-base text-slate-600">
                      {section.points.map((point, index) => (
                        <li key={index} className="ml-2">
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-200/80">
                <p className="text-base text-slate-600">
                  Need help choosing the right machine for your project?
                </p>
                <Link
                  to={`/contact?equipmentSlug=${encodeURIComponent(legacyCard.slug)}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white transition-all"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  if (!machineView) {
    return <Navigate to="/equipments" replace />;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <Link
          to="/equipments"
          className="inline-flex items-center gap-2 min-h-[44px] px-4 mb-4 rounded-full border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:bg-slate-900 hover:!text-white transition-all"
        >
          <span>←</span>
          <span>Back to Equipments</span>
        </Link>

        <article className="border border-slate-200/80 bg-white rounded-2xl shadow-xl shadow-slate-900/8 overflow-hidden animate-fade-up">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-sky-50 p-6 flex items-center justify-center">
              <img
                src={machineView.image}
                alt={machineView.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-sm font-semibold w-fit">
                  {machineView.categoryName}
                </span>
              </div>

              <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {machineView.title}
              </h1>
              <p className="mt-2 text-base text-slate-600">
                {machineView.categoryCode
                  ? `${machineView.categoryCode} | `
                  : ""}
                Reliable rental support
              </p>

              {machineView.descriptionText ? (
                <p className="mt-4 text-sm text-slate-500">
                  {machineView.descriptionText.slice(0, 140)}
                  {machineView.descriptionText.length > 140 ? "..." : ""}
                </p>
              ) : null}

              <div className="mt-6">
                <Link
                  to={`/contact?machineryId=${machineView.id}`}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
                  style={{ color: "#fff" }}
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/80" />

          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Equipment Overview
            </h2>
            {machineView.descriptionHtmlDisplay ? (
              <div
                className="equipment-html"
                dangerouslySetInnerHTML={{
                  __html: machineView.descriptionHtmlDisplay,
                }}
              />
            ) : (
              <div className="equipment-html">
                <p>
                  We are preparing the detailed equipment description for this
                  machine. Please contact us if you want the full technical
                  specification right away.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-200/80">
              <p className="text-base text-slate-600">
                Need help choosing the right machine for your project?
              </p>
              <Link
                to={`/contact?machineryId=${machineView.id}`}
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-slate-300 bg-white text-slate-800 font-medium hover:bg-slate-900 hover:!text-white transition-all"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default EquipmentDetails;
