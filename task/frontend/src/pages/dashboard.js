// src/pages/Dashboard.js
import React, { useState } from "react";
import PlotGraph from "../components/plotGraph";
import Piechart from "../components/piechart";

/* TOP TAB ICONS */
import buildingDefault from "../assets/icons/building.svg";
import buildingActive from "../assets/icons/building_active.svg";

import bulbDefault from "../assets/icons/bulb.svg";
import bulbActive from "../assets/icons/bulb_active.svg";

import airconDefault from "../assets/icons/aircon.svg";
import airconActive from "../assets/icons/aircon_active.svg";

import othersDefault from "../assets/icons/others.svg";
import othersActive from "../assets/icons/others_active.svg";

export default function Dashboard() {
  // Middle nav bar
  const [activeTab, setActiveTab] = useState("building");

  const tabs = [
    { id: "building", label: "Building Load", defaultIcon: buildingDefault, activeIcon: buildingActive },
    { id: "lights",   label: "Lights",        defaultIcon: bulbDefault,     activeIcon: bulbActive },
    { id: "ac",       label: "AC",            defaultIcon: airconDefault,   activeIcon: airconActive },
    { id: "others",   label: "Others",        defaultIcon: othersDefault,   activeIcon: othersActive }
  ];

  // daily, monthly, yearly
  const [activePeriod, setActivePeriod] = useState("daily");

  const loadParts = [
    {
      id: "daily",
      bigTitle: "Building Load",
      bottomLabel: "Present Building Load",
      bigMetrics: [
        { label: "Consuming",       value: "109 kW / ₹ 5 per kW" },
        { label: "Cost",            value: "₹ 595" },
        { label: "Today expected",  value: "178 kW" },
        { label: "Peak demand Hours", value: "9 AM–1 PM & 3 PM–9 PM" },
      ],
      smallTitle: "Daily Building Load",
      smallLines: [
        "Consuming: 109 kW",
        "Cost: ₹ 595",
        "Today expected: 178 kW",
        "Peak demand hours: 9AM–1PM, 3PM–9PM",
      ],
    },
    {
      id: "monthly",
      bigTitle: "Monthly Building Load",
      bottomLabel: "Monthly Building Load",
      bigMetrics: [
        { label: "Consuming",       value: "569 M kW" },
        { label: "Cost",            value: "₹ 5000 / s.p." },
        { label: "Monthly expected", value: "670 M kW" },
        { label: "Peak demand Hours", value: "-" },
      ],
      smallTitle: "Monthly Building Load",
      smallLines: [
        "Consuming: 569 M kW",
        "Cost: ₹ 5000 / s.p.",
        "Monthly expected: 670 M kW",
        "Peak demand hours",
      ],
    },
    {
      id: "yearly",
      bigTitle: "Yearly Building Load",
      bottomLabel: "Yearly Building Load",
      bigMetrics: [
        { label: "Consuming",       value: "2458 M kW" },
        { label: "Cost",            value: "₹ 45000 / s.p." },
        { label: "Monthly expected", value: "3500 M kW" },
        { label: "Peak demand Hours", value: "-" },
      ],
      smallTitle: "Yearly Building Load",
      smallLines: [
        "Consuming: 2458 M kW",
        "Cost: ₹ 45000 / s.p.",
        "Monthly expected: 3500 M kW",
        "Peak demand hours",
      ],
    },
  ];

  const activePart = loadParts.find((c) => c.id === activePeriod);
  const otherPart = loadParts.filter((c) => c.id !== activePeriod);

  return (
    <div className="dashboard-page">
      {/* middle nav tabs */}
      <div className="dashboard-tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${isActive ? "tab-button-active" : ""}`}
            >
              <span className="tab-icon-wrapper">
                <img
                  src={isActive ? tab.activeIcon : tab.defaultIcon}
                  alt={tab.label}
                  className="tab-icon"
                />
              </span>
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/*big part with 2 parts and the guage */}
      <div className="dashboard-main-grid">
        {/* main big part */}
        <section className="part building-load-part">
          <div className="building-load-left">
            <h2 className="part-title">{activePart.bigTitle}</h2>
            {activePart.bigMetrics.map((m) => (
              <div key={m.label}>
                <p className="metric-label">{m.label}</p>
                <p className="metric-value">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="building-load-bottom">{activePart.bottomLabel}</div>
        </section>

        {/* 2 small parts – click to swap into big part */}
        <section className="building-summary-column">
          {otherPart.map((part) => (
            <div
              key={part.id}
              className="part small-summary-part"
              onClick={() => setActivePeriod(part.id)}
              style={{ cursor: "pointer" }}
            >
              <h3 className="small-title">{part.smallTitle}</h3>
              {part.smallLines.map((line, i) => (
                <p className="small-line" key={i}>{line}</p>
              ))}
            </div>
          ))}
        </section>

        {/* gauge */}
        <section className="part potential-part">
          <h3 className="part-title">Potential Supply</h3>
          <div className="gauge-wrapper">
            <div className="fake-gauge">
              <span className="gauge-value">
                {activePeriod === "daily" ? "78%" :
                 activePeriod === "monthly" ? "82%" : "88%"}
              </span>
            </div>
            <div className="gauge-text">
              <p className="metric-label">Current usage</p>
            </div>
          </div>

          <div className="potential-metrics">
            {activePeriod === "daily" && (
              <>
                <p>Energy Efficiency Ratio <span className="metric-strong">80%</span></p>
                <p>Estimates <span className="metric-strong">0.5 tons/day</span></p>
                <p>Savings Reduction Cost <span className="metric-strong">20%</span></p>
              </>
            )}
            {activePeriod === "monthly" && (
              <>
                <p>Energy Efficiency Ratio <span className="metric-strong">85%</span></p>
                <p>Estimates <span className="metric-strong">0.45 tons/day</span></p>
                <p>Savings Reduction Cost <span className="metric-strong">15%</span></p>
              </>
            )}
            {activePeriod === "yearly" && (
              <>
                <p>Energy Efficiency Ratio <span className="metric-strong">91%</span></p>
                <p>Estimates <span className="metric-strong">0.5 tons/day</span></p>
                <p>Savings Reduction Cost <span className="metric-strong">7%</span></p>
              </>
            )}
          </div>
        </section>
      </div>

      {/*graph and piechart in the bottom */}
      <div className="dashboard-bottom-grid">
        {/* graph */}
        <section className="part cost-part">
          <div className="part-header-row">
            <div>
              <h3 className="part-title">Cost Analyzing</h3>
              <p className="part-sub">Interactive graph with zoom, pan and hover.</p>
            </div>
            <div className="time-badge">
              <span>Date</span>
              <strong>21/07/2025</strong>
            </div>
          </div>

          <div className="chart-placeholder">
            <PlotGraph period={activePeriod} />
          </div>
        </section>

        {/* piechart */}
        <section className="part overall-part">
          <Piechart period={activePeriod} />
        </section>
      </div>
    </div>
  );
}
