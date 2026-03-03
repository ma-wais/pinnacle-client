import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardShell from "../ui/DashboardShell";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Clock3,
  FileText,
  Files,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

type Stats = {
  totalUsers: number;
  unverifiedUsers: number;
  verifiedUsers: number;
  totalDocuments: number;
  pendingDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
};

type PriceData = {
  price: number;
  lastUpdated: string;
  rawPrice?: number;
  source?: string;
  status?: string;
};

type PricingConfig = {
  baseCopperPrice: number;
  baseAluminumPrice: number;
  baseLeadPrice: number;
  baseZincPrice: number;
  updatedAt: string;
};

type MaterialsData = {
  materials: Array<{
    key: string;
    label: string;
    multiplier: number;
    formula: string;
    recoveryRate?: number;
    processingDeduction?: number;
    price: number;
  }>;
  source?: string;
  status?: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [pricingConfig, setPricingConfig] = useState<PricingConfig | null>(
    null,
  );
  const [materialsData, setMaterialsData] = useState<MaterialsData | null>(
    null,
  );
  const [priceInputs, setPriceInputs] = useState({
    copper: "",
    aluminum: "",
    lead: "",
    zinc: "",
  });
  const [savingPrice, setSavingPrice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    const [statsData, pData, configData, materials] = await Promise.all([
      apiFetch<Stats>("/api/admin/stats"),
      apiFetch<PriceData>("/api/prices/copper"),
      apiFetch<PricingConfig>("/api/admin/pricing"),
      apiFetch<MaterialsData>("/api/prices/materials"),
    ]);

    setStats(statsData);
    setPriceData(pData);
    setPricingConfig(configData);
    setMaterialsData(materials);
    setPriceInputs({
      copper: String(configData.baseCopperPrice || ""),
      aluminum: String(configData.baseAluminumPrice || ""),
      lead: String(configData.baseLeadPrice || ""),
      zinc: String(configData.baseZincPrice || ""),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      }
    })();
  }, []);

  const saveBasePrice = async () => {
    setError(null);
    const copper = Number(priceInputs.copper);
    const aluminum = Number(priceInputs.aluminum);
    const lead = Number(priceInputs.lead);
    const zinc = Number(priceInputs.zinc);

    if (
      [copper, aluminum, lead, zinc].some(
        (value) => Number.isNaN(value) || value < 0,
      )
    ) {
      setError("Please enter valid metal prices");
      return;
    }

    setSavingPrice(true);
    try {
      await apiFetch("/api/admin/pricing", {
        method: "PATCH",
        body: JSON.stringify({
          baseCopperPrice: copper,
          baseAluminumPrice: aluminum,
          baseLeadPrice: lead,
          baseZincPrice: zinc,
        }),
      });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save price");
    } finally {
      setSavingPrice(false);
    }
  };

  return (
    <DashboardShell title="Admin Dashboard">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row gy-24 mb-8">
        <div className="col-12">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm">
            <div className="d-flex flex-wrap align-items-end gap-16">
              <div className="flex-grow-1" style={{ minWidth: 220 }}>
                <label className="text-neutral-500 text-sm fw-bold mb-8 d-block">
                  Base Copper Price (GBP per Tonne)
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceInputs.copper}
                  onChange={(e) =>
                    setPriceInputs((prev) => ({
                      ...prev,
                      copper: e.target.value,
                    }))
                  }
                  className="form-control border-neutral-30"
                  placeholder="e.g. 7500"
                />
              </div>
              <div className="flex-grow-1" style={{ minWidth: 220 }}>
                <label className="text-neutral-500 text-sm fw-bold mb-8 d-block">
                  Base Aluminum Price (GBP per Tonne)
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceInputs.aluminum}
                  onChange={(e) =>
                    setPriceInputs((prev) => ({
                      ...prev,
                      aluminum: e.target.value,
                    }))
                  }
                  className="form-control border-neutral-30"
                  placeholder="e.g. 1800"
                />
              </div>
              <div className="flex-grow-1" style={{ minWidth: 220 }}>
                <label className="text-neutral-500 text-sm fw-bold mb-8 d-block">
                  Base Lead Price (GBP per Tonne)
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceInputs.lead}
                  onChange={(e) =>
                    setPriceInputs((prev) => ({
                      ...prev,
                      lead: e.target.value,
                    }))
                  }
                  className="form-control border-neutral-30"
                  placeholder="e.g. 1700"
                />
              </div>
              <div className="flex-grow-1" style={{ minWidth: 220 }}>
                <label className="text-neutral-500 text-sm fw-bold mb-8 d-block">
                  Base Zinc Price (GBP per Tonne)
                </label>
                <input
                  type="number"
                  min="0"
                  value={priceInputs.zinc}
                  onChange={(e) =>
                    setPriceInputs((prev) => ({
                      ...prev,
                      zinc: e.target.value,
                    }))
                  }
                  className="form-control border-neutral-30"
                  placeholder="e.g. 2200"
                />
              </div>
              <button
                type="button"
                className="btn rounded px-14 py-10"
                style={{
                  background: "var(--main-600)",
                  color: "#fff",
                }}
                onClick={saveBasePrice}
                disabled={savingPrice}
              >
                {savingPrice ? "Saving..." : "Save Base Price"}
              </button>
            </div>

            {pricingConfig && (
              <p className="text-neutral-400 text-xs mt-12 mb-0">
                Last updated:{" "}
                {new Date(pricingConfig.updatedAt).toLocaleString()}
              </p>
            )}

            {materialsData?.materials?.length ? (
              // <div className="table-responsive mt-16">
              //   <table className="table table-sm align-middle mb-0">
              //     <thead>
              //       <tr>
              //         <th>Material</th>
              //         <th>Formula</th>
              //         <th>Multiplier</th>
              //         <th>Price</th>
              //       </tr>
              //     </thead>
              //     <tbody>
              //       {materialsData.materials.map((item) => (
              //         <tr key={item.key}>
              //           <td>{item.label}</td>
              //           <td>{item.formula}</td>
              //           <td>{item.multiplier.toFixed(4)}</td>
              //           <td>£{item.price.toLocaleString()}</td>
              //         </tr>
              //       ))}
              //     </tbody>
              //   </table>
              // </div>
              <></>
            ) : null}
          </div>
        </div>
      </div>

      <div className="row gy-24">
        {/* Box 1: Total Users */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-25 text-main-600 text-24 rounded-circle border border-main-100">
                <Users size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Total Users</h6>
            <h4 className="mb-16">{stats?.totalUsers || 0}</h4>
            <Link
              to="/admin/users"
              className="text-main-600 text-sm fw-bold hover-text-main-700"
            >
              Manage Users <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Box 2: Unverified Users */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-warning-50 text-warning-600 text-24 rounded-circle border border-warning-100">
                <UserPlus size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Unverified Users
            </h6>
            <h4 className="mb-16">{stats?.unverifiedUsers || 0}</h4>
            <Link
              to="/admin/users"
              className="text-main-600 text-sm fw-bold hover-text-main-700"
            >
              Review Users <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Box 3: Verified Users */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-success-50 text-success-600 text-24 rounded-circle border border-success-100">
                <BadgeCheck size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Verified Users</h6>
            <h4 className="mb-16">{stats?.verifiedUsers || 0}</h4>
            <div className="text-success-600 text-sm fw-bold">
              Active Members
            </div>
          </div>
        </div>

        {/* Box 4: Total Documents */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-purple-50 text-purple-600 text-24 rounded-circle border border-purple-100">
                <FileText size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Total Documents</h6>
            <h4 className="mb-16">{stats?.totalDocuments || 0}</h4>
            <div className="text-purple-600 text-sm fw-bold">
              System Repository
            </div>
          </div>
        </div>

        {/* Box 5: Pending Documents */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-danger-50 text-danger-600 text-24 rounded-circle border border-danger-100">
                <Clock3 size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Pending Review</h6>
            <h4 className="mb-16">{stats?.pendingDocuments || 0}</h4>
            <Link
              to="/admin/users"
              className="text-main-600 text-sm fw-bold hover-text-main-700"
            >
              Action Required <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Box 6: Approved Documents */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-50 text-main-600 text-24 rounded-circle border border-main-100">
                <Files size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Approved Docs</h6>
            <h4 className="mb-16">{stats?.approvedDocuments || 0}</h4>
            <div className="text-main-600 text-sm fw-bold">Compliant Files</div>
          </div>
        </div>

        {/* Box 7: Copper Price */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-orange-50 text-orange-600 text-24 rounded-circle border border-orange-100">
                <TrendingUp size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Copper (LME)</h6>
            <h4 className="mb-4">
              £{(priceData?.price || 0).toLocaleString()}
            </h4>
            {priceData?.rawPrice && (
              <div className="text-neutral-400 text-xs mb-12">
                Raw: ${priceData.rawPrice.toFixed(5)} / lb
              </div>
            )}
            <div className="text-orange-600 text-sm fw-bold">
              {priceData?.source || "Live Market Rate"}
            </div>
            <div className="text-neutral-400 text-xs mt-8">
              {priceData?.status || "Live"}
            </div>
          </div>
        </div>

        {/* Box 8: Last Updated */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-neutral-50 text-neutral-600 text-24 rounded-circle border border-neutral-100">
                <Calendar size={22} />
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Price Synchronized
            </h6>
            <h4 className="mb-16 text-18">
              {priceData?.lastUpdated
                ? new Date(priceData.lastUpdated).toLocaleDateString()
                : "Checking..."}
            </h4>
            <div className="text-neutral-500 text-sm fw-bold">
              {priceData?.lastUpdated
                ? new Date(priceData.lastUpdated).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Market Feed"}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
