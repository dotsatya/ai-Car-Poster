export interface OrderItem {
  id: string;
  templateName: string;
  templateSlug: string;
  vehicle: string;
  sizeLabel: string;
  dimensions: string;
  framing: string;
  certificateNumber: string;
  price: string;
  image: string;
  qty: number;
}

export interface OrderMilestone {
  date: string;
  title: string;
  detail: string;
  completed: boolean;
  current?: boolean;
}

export type AtelierOrderStatus =
  | "order_received"
  | "preparing_artwork"
  | "printing"
  | "quality_check_packing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "in_transit"
  | "processing";

export interface AtelierOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: AtelierOrderStatus;
  statusLabel: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  courier: string;
  trackingNumber: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  totalAmount: string;
  items: OrderItem[];
  milestones: OrderMilestone[];
}

export const ORDER_FLOW_STEPS = [
  {
    key: "order_received",
    title: "Order Received",
    detail: "Order confirmed and logged in the Atelier fine-art production registry.",
  },
  {
    key: "preparing_artwork",
    title: "Preparing Artwork",
    detail: "Digital AI diffusion master scaled at 300+ DPI. Prepress curation & color grading.",
  },
  {
    key: "printing",
    title: "Printing",
    detail: "12-color archival giclée plotter execution on 310 GSM 100% cotton rag paper.",
  },
  {
    key: "quality_check_packing",
    title: "Quality Check & Packing",
    detail: "Chromatics inspection, serialized hologram seal applied, and protective flight casing.",
  },
  {
    key: "shipped",
    title: "Shipped",
    detail: "Dispatched via insured express air courier logistics with end-to-end telemetry.",
  },
  {
    key: "out_for_delivery",
    title: "Out for Delivery",
    detail: "Package arrived at local delivery hub and out for white-glove collector handover.",
  },
  {
    key: "delivered",
    title: "Delivered",
    detail: "Successfully handed over and confirmed with recipient signature.",
  },
] as const;

export function getStatusBadgeStyle(status: string, statusLabel?: string) {
  const norm = (statusLabel || status || "").toLowerCase();

  if (norm.includes("delivered")) {
    return {
      pill: "bg-emerald-950/40 text-emerald-400 border border-emerald-500/25",
      dot: "bg-emerald-400",
      label: "Delivered",
    };
  }
  if (norm.includes("out for delivery") || norm.includes("out_for_delivery")) {
    return {
      pill: "bg-amber-950/40 text-amber-400 border border-amber-500/25",
      dot: "bg-amber-400 animate-pulse",
      label: "Out for Delivery",
    };
  }
  if (norm.includes("shipped")) {
    return {
      pill: "bg-purple-950/40 text-purple-400 border border-purple-500/25",
      dot: "bg-purple-400",
      label: "Shipped",
    };
  }
  if (norm.includes("quality") || norm.includes("packing") || norm.includes("check")) {
    return {
      pill: "bg-cyan-950/40 text-cyan-400 border border-cyan-500/25",
      dot: "bg-cyan-400 animate-pulse",
      label: "Quality Check & Packing",
    };
  }
  if (
    norm.includes("printing") ||
    norm.includes("production") ||
    norm.includes("plotter")
  ) {
    return {
      pill: "bg-sky-950/40 text-sky-400 border border-sky-500/25",
      dot: "bg-sky-400 animate-pulse",
      label: "Printing",
    };
  }
  if (
    norm.includes("preparing") ||
    norm.includes("artwork") ||
    norm.includes("process")
  ) {
    return {
      pill: "bg-indigo-950/40 text-indigo-400 border border-indigo-500/25",
      dot: "bg-indigo-400 animate-pulse",
      label: "Preparing Artwork",
    };
  }
  return {
    pill: "bg-neutral-800/60 text-neutral-300 border border-white/15",
    dot: "bg-neutral-400",
    label: "Order Received",
  };
}

export function generateOrderMilestones(
  currentStatus: string,
  baseDate: string
): OrderMilestone[] {
  const norm = (currentStatus || "").toLowerCase().replace(/[\s-]/g, "_");

  let currentIndex = ORDER_FLOW_STEPS.findIndex(
    (s) => s.key === norm || s.title.toLowerCase() === norm
  );

  if (currentIndex === -1) {
    if (norm.includes("deliver")) currentIndex = 6;
    else if (norm.includes("out")) currentIndex = 5;
    else if (norm.includes("ship")) currentIndex = 4;
    else if (norm.includes("qual") || norm.includes("pack")) currentIndex = 3;
    else if (norm.includes("print") || norm.includes("plot")) currentIndex = 2;
    else if (norm.includes("art") || norm.includes("prep") || norm.includes("process"))
      currentIndex = 1;
    else currentIndex = 0;
  }

  return ORDER_FLOW_STEPS.map((step, idx) => {
    const isCompleted = idx <= currentIndex;
    const isCurrent = idx === currentIndex;
    let dateStr = "Pending";

    if (isCompleted) {
      if (idx === 0) dateStr = `${baseDate} · Completed`;
      else if (isCurrent) dateStr = "In Progress";
      else dateStr = "Completed";
    }

    return {
      date: dateStr,
      title: step.title,
      detail: step.detail,
      completed: isCompleted,
      current: isCurrent,
    };
  });
}

export const INITIAL_ORDERS: AtelierOrder[] = [
  {
    id: "PG-2026-18637",
    orderNumber: "PG-2026-18637",
    date: "November 16, 2026",
    status: "printing",
    statusLabel: "Printing",
    estimatedDelivery: "Expected in 4-5 business days",
    courier: "FedEx Priority Fine Art · Insured Flight Logistics",
    trackingNumber: "FX-1781-9957-US",
    shippingAddress: {
      name: "Satya Sundar Dey",
      street: "9540 Wilshire Blvd, Suite 800",
      city: "Beverly Hills",
      state: "California",
      postalCode: "90212",
      phone: "+1 (310) 894-2201",
    },
    totalAmount: "$239",
    items: [
      {
        id: "item-18637-1",
        templateName: "PORSCHE 911 TURBO S SHARK BLUE TOKYO CYBER",
        templateSlug: "porsche-911-turbo-s-shark-blue-cyber",
        vehicle: "Porsche 911 GT3 RS",
        sizeLabel: "12 × 18 inches",
        dimensions: "12 × 18 inches • 300 DPI",
        framing: "CNC Matte Obsidian Aluminum · Museum UV Acrylic Glazing",
        certificateNumber: "CERT-#1863-911T",
        price: "$55",
        image: "/template photo/1.webp",
        qty: 1,
      },
      {
        id: "item-18637-2",
        templateName: "PORSCHE 911 GT3 RS BRITISH RACING GREEN & GOLD",
        templateSlug: "porsche-911-gt3-rs-racing-green-gold",
        vehicle: "Porsche 911 GT3 RS",
        sizeLabel: "A2",
        dimensions: "420 × 594 mm • 300 DPI",
        framing: "Hand-Brushed Champagne Gold Anodized Aluminum · Museum Acrylic",
        certificateNumber: "CERT-#1863-GT3G",
        price: "$79",
        image: "/template photo/2.webp",
        qty: 1,
      },
      {
        id: "item-18637-3",
        templateName: "TOYOTA GR SUPRA MK5 SUNBURST YELLOW",
        templateSlug: "toyota-gr-supra-mk5-yellow",
        vehicle: "Porsche 911 GT3 RS",
        sizeLabel: "A3",
        dimensions: "297 × 420 mm • 300 DPI",
        framing: "CNC Matte Obsidian Aluminum · Museum UV Acrylic Glazing",
        certificateNumber: "CERT-#1863-SUPY",
        price: "$45",
        image: "/template photo/3.webp",
        qty: 1,
      },
      {
        id: "item-18637-4",
        templateName: "HARMONIZED COMPOSITE ATELIER EDITION",
        templateSlug: "harmonized-composite-atelier",
        vehicle: "Harmonized Triptych Spec",
        sizeLabel: "A3",
        dimensions: "297 × 420 mm • 300 DPI",
        framing: "Museum Archival Mount",
        certificateNumber: "CERT-#1863-HARM",
        price: "$45",
        image: "/template photo/4.webp",
        qty: 1,
      },
    ],
    milestones: [
      {
        date: "Nov 16, 2026 · 10:15",
        title: "Order Received",
        detail: "Order confirmed and logged in the Atelier fine-art production registry.",
        completed: true,
      },
      {
        date: "Nov 16, 2026 · 11:30",
        title: "Preparing Artwork",
        detail: "Digital AI diffusion master scaled at 300+ DPI. Prepress curation & color grading.",
        completed: true,
      },
      {
        date: "In Progress",
        title: "Printing",
        detail: "12-color archival giclée plotter execution on 310 GSM 100% cotton rag paper.",
        completed: true,
        current: true,
      },
      {
        date: "Pending",
        title: "Quality Check & Packing",
        detail: "Chromatics inspection, serialized hologram seal applied, and protective flight casing.",
        completed: false,
      },
      {
        date: "Pending",
        title: "Shipped",
        detail: "Dispatched via insured express air courier logistics with end-to-end telemetry.",
        completed: false,
      },
      {
        date: "Pending",
        title: "Out for Delivery",
        detail: "Package arrived at local delivery hub and out for white-glove collector handover.",
        completed: false,
      },
      {
        date: "Pending",
        title: "Delivered",
        detail: "Successfully handed over and confirmed with recipient signature.",
        completed: false,
      },
    ],
  },
  {
    id: "PG-2026-17521",
    orderNumber: "PG-2026-17521",
    date: "October 28, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    deliveredDate: "November 2, 2026 · Signed by Collector",
    courier: "FedEx Priority Fine Art · Insured Express Courier",
    trackingNumber: "FX-9482-7710-US",
    shippingAddress: {
      name: "Satya Sundar Dey",
      street: "9540 Wilshire Blvd, Suite 800",
      city: "Beverly Hills",
      state: "California",
      postalCode: "90212",
      phone: "+1 (310) 894-2201",
    },
    totalAmount: "$139",
    items: [
      {
        id: "item-17521-1",
        templateName: "Porsche 911 GT3 RS Minimalist Spec",
        templateSlug: "porsche-911-gt3-rs-minimalist-spec",
        vehicle: "Porsche 911 GT3 RS (992) — Ice Grey / Pyro Red",
        sizeLabel: "A2 Gallery (42.0 × 59.4 cm)",
        dimensions: "420 × 594 mm • 300 DPI",
        framing: "CNC Matte Obsidian Aluminum · Museum UV Acrylic Glazing",
        certificateNumber: "CERT-#0892-GT3",
        price: "$79",
        image: "/template photo/1.webp",
        qty: 1,
      },
      {
        id: "item-17521-2",
        templateName: "Porsche 911 Turbo S Shark Blue Tokyo Cyber",
        templateSlug: "porsche-911-turbo-s-shark-blue-cyber",
        vehicle: "Porsche 911 Turbo S (992) — Shark Blue",
        sizeLabel: "A3 Studio (29.7 × 42.0 cm)",
        dimensions: "297 × 420 mm • 300 DPI",
        framing: "CNC Matte Obsidian Aluminum · Museum UV Acrylic Glazing",
        certificateNumber: "CERT-#0510-TYO",
        price: "$45",
        image: "/template photo/4.webp",
        qty: 1,
      },
    ],
    milestones: [
      {
        date: "Oct 28, 2026 · 14:22",
        title: "Order Received",
        detail: "Order confirmed and logged in the Atelier fine-art production registry.",
        completed: true,
      },
      {
        date: "Oct 29, 2026 · 09:15",
        title: "Preparing Artwork",
        detail: "Digital AI diffusion master scaled at 300+ DPI. Prepress curation & color grading.",
        completed: true,
      },
      {
        date: "Oct 30, 2026 · 11:30",
        title: "Printing",
        detail: "12-color archival giclée plotter execution on 310 GSM 100% cotton rag paper.",
        completed: true,
      },
      {
        date: "Oct 30, 2026 · 16:40",
        title: "Quality Check & Packing",
        detail: "Chromatics inspection, serialized hologram seal applied, and protective flight casing.",
        completed: true,
      },
      {
        date: "Oct 31, 2026 · 08:30",
        title: "Shipped",
        detail: "Dispatched via insured express air courier logistics with end-to-end telemetry.",
        completed: true,
      },
      {
        date: "Nov 02, 2026 · 08:15",
        title: "Out for Delivery",
        detail: "Package arrived at local delivery hub and out for white-glove collector handover.",
        completed: true,
      },
      {
        date: "Nov 02, 2026 · 11:45",
        title: "Delivered",
        detail: "Successfully handed over and confirmed with recipient signature.",
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: "PG-2026-16490",
    orderNumber: "PG-2026-16490",
    date: "October 12, 2026",
    status: "delivered",
    statusLabel: "Delivered",
    deliveredDate: "October 17, 2026 · Signed by Collector",
    courier: "FedEx Custom Critical Fine Art Services",
    trackingNumber: "FX-8819-2041-US",
    shippingAddress: {
      name: "Satya Dey (Studio Atelier)",
      street: "Hangar 7, Santa Monica Airport, Airport Ave",
      city: "Santa Monica",
      state: "California",
      postalCode: "90405",
      phone: "+1 (310) 894-2205",
    },
    totalAmount: "$232",
    items: [
      {
        id: "item-16490-1",
        templateName: "Porsche 911 GT3 RS British Racing Green & Gold",
        templateSlug: "porsche-911-gt3-rs-racing-green-gold",
        vehicle: "Porsche 911 GT3 RS — Weissach Package",
        sizeLabel: "Panoramic Grand (60.0 × 120.0 cm)",
        dimensions: "600 × 1200 mm • 300 DPI",
        framing: "Hand-Brushed Champagne Gold Anodized Aluminum · Anti-Glare Acrylic",
        certificateNumber: "CERT-#0744-BRG",
        price: "$159",
        image: "/template photo/2.webp",
        qty: 1,
      },
      {
        id: "item-16490-2",
        templateName: "BMW M4 CSL Matte Black Technical Spec",
        templateSlug: "bmw-m4-csl-matte-black-spec",
        vehicle: "BMW M4 CSL (G82) — Frozen Brooklyn Grey",
        sizeLabel: "A4 Studio (21.0 × 29.7 cm)",
        dimensions: "210 × 297 mm • 300 DPI",
        framing: "Unframed Museum Folio Mounting",
        certificateNumber: "CERT-#0319-M4",
        price: "$29",
        image: "/template photo/5.webp",
        qty: 1,
      },
      {
        id: "item-16490-3",
        templateName: "Toyota GR Supra MK5 Sunburst Yellow",
        templateSlug: "toyota-gr-supra-mk5-yellow",
        vehicle: "Toyota GR Supra MK5 (A90)",
        sizeLabel: "A4 Studio (21.0 × 29.7 cm)",
        dimensions: "210 × 297 mm • 300 DPI",
        framing: "Unframed Museum Folio Mounting",
        certificateNumber: "CERT-#0198-SUP",
        price: "$29",
        image: "/template photo/3.webp",
        qty: 1,
      },
    ],
    milestones: [
      {
        date: "Oct 12, 2026 · 11:05",
        title: "Order Received",
        detail: "Order confirmed and logged in the Atelier fine-art production registry.",
        completed: true,
      },
      {
        date: "Oct 13, 2026 · 10:20",
        title: "Preparing Artwork",
        detail: "Digital AI diffusion master scaled at 300+ DPI. Prepress curation & color grading.",
        completed: true,
      },
      {
        date: "Oct 14, 2026 · 17:30",
        title: "Printing",
        detail: "12-color archival giclée plotter execution on 310 GSM 100% cotton rag paper.",
        completed: true,
      },
      {
        date: "Oct 15, 2026 · 10:00",
        title: "Quality Check & Packing",
        detail: "Chromatics inspection, serialized hologram seal applied, and protective flight casing.",
        completed: true,
      },
      {
        date: "Oct 16, 2026 · 09:00",
        title: "Shipped",
        detail: "Dispatched via insured express air courier logistics with end-to-end telemetry.",
        completed: true,
      },
      {
        date: "Oct 17, 2026 · 09:45",
        title: "Out for Delivery",
        detail: "Package arrived at local delivery hub and out for white-glove collector handover.",
        completed: true,
      },
      {
        date: "Oct 17, 2026 · 15:30",
        title: "Delivered",
        detail: "Successfully handed over and confirmed with recipient signature.",
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: "PG-2026-15233",
    orderNumber: "PG-2026-15233",
    date: "September 25, 2026",
    status: "shipped",
    statusLabel: "Shipped",
    estimatedDelivery: "September 29, 2026",
    courier: "FedEx Priority Fine Art · Insured Flight Logistics",
    trackingNumber: "FX-8841-9921-US",
    shippingAddress: {
      name: "Satya Sundar Dey",
      street: "9540 Wilshire Blvd, Suite 800",
      city: "Beverly Hills",
      state: "California",
      postalCode: "90212",
      phone: "+1 (310) 894-2201",
    },
    totalAmount: "$70",
    items: [
      {
        id: "item-15233-1",
        templateName: "McLaren 720S Red Graffiti Street Art",
        templateSlug: "mclaren-720s-red-graffiti",
        vehicle: "McLaren 720S Performance Coupe",
        sizeLabel: "12×18 Architectural (30.5 × 45.7 cm)",
        dimensions: "305 × 457 mm • 300 DPI",
        framing: "CNC Matte Obsidian Aluminum · Museum Acrylic",
        certificateNumber: "CERT-#0412-MCL",
        price: "$55",
        image: "/template photo/3.webp",
        qty: 1,
      },
    ],
    milestones: [
      {
        date: "Sep 25, 2026 · 16:30",
        title: "Order Received",
        detail: "Order confirmed and logged in the Atelier fine-art production registry.",
        completed: true,
      },
      {
        date: "Sep 26, 2026 · 10:00",
        title: "Preparing Artwork",
        detail: "Digital AI diffusion master scaled at 300+ DPI. Prepress curation & color grading.",
        completed: true,
      },
      {
        date: "Sep 26, 2026 · 16:30",
        title: "Printing",
        detail: "12-color archival giclée plotter execution on 310 GSM 100% cotton rag paper.",
        completed: true,
      },
      {
        date: "Sep 27, 2026 · 13:15",
        title: "Quality Check & Packing",
        detail: "Chromatics inspection, serialized hologram seal applied, and protective flight casing.",
        completed: true,
      },
      {
        date: "Sep 28, 2026 · 08:30",
        title: "Shipped",
        detail: "Dispatched via insured express air courier logistics with end-to-end telemetry.",
        completed: true,
        current: true,
      },
      {
        date: "Expected Sep 29, 2026",
        title: "Out for Delivery",
        detail: "Package arrived at local delivery hub and out for white-glove collector handover.",
        completed: false,
      },
      {
        date: "Expected Sep 29, 2026",
        title: "Delivered",
        detail: "Successfully handed over and confirmed with recipient signature.",
        completed: false,
      },
    ],
  },
];

export function getAllOrders(): AtelierOrder[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const stored = localStorage.getItem("postergen_orders");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Keep canonical INITIAL_ORDERS pristine, only prepend custom user orders from checkout
        const initialIds = new Set(INITIAL_ORDERS.map((o) => o.id));
        const userOrders = parsed
          .filter((o: AtelierOrder) => !initialIds.has(o.id))
          .map((ord: AtelierOrder) => {
            if (!ord.milestones || ord.milestones.length === 0) {
              return {
                ...ord,
                milestones: generateOrderMilestones(ord.status || ord.statusLabel, ord.date),
              };
            }
            return ord;
          });
        return [...userOrders, ...INITIAL_ORDERS];
      }
    }
  } catch {
    // Fallback
  }
  return INITIAL_ORDERS;
}

export function getOrderById(id: string): AtelierOrder | undefined {
  const all = getAllOrders();
  const normalized = decodeURIComponent(id).toLowerCase().trim().replace(/^#/, "");
  return all.find(
    (o) =>
      o.id.toLowerCase().replace(/^#/, "") === normalized ||
      o.orderNumber.toLowerCase().replace(/^#/, "") === normalized
  );
}
