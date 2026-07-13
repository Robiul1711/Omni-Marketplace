import React from 'react';

// --- Sub-Components ---

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
  </svg>
);

// --- Step Data Array ---

const ADVERTISER_STEPS = [
  {
    title: "Browse Placements",
    description: "Users browse available advertising placements created by hosts.",
    listLabel: "Each placement includes:",
    items: ["Price set by host", "Screen type (TV, monitor, tablet, or streamed device)", "Availability schedule", "Basic preview of the screen environment"],
    footer: "Users choose a placement based on budget and campaign fit.",
    colorClass: "blue",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  },
  {
    title: "Create Ad (External Tools + Upload System)",
    description: "Users create their advertising content using external tools like Canva or similar platforms.",
    listLabel: "They can:",
    items: ["Design slideshows, banners, or video ads in Canva", "Export and upload files into the platform", "Or upload pre-made content directly"],
    footer: "Users choose a placement based on budget and campaign fit.",
    colorClass: "purple",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  },
  {
    title: "Campaign Setup & Scheduling",
    description: "Configure your campaign with duration, time slots, and placement details.",
    subSections: [
      { label: "Users:", items: ["Select duration and time slot", "Match their content to placement requirements", "Confirm campaign details"] },
      { label: "At this stage:", items: ["Payment is processed", "Funds are held in escrow (not released yet)"] }
    ],
    colorClass: "green",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    title: "Live Screen Casting / Streaming System",
    description: "Your content goes live on selected screens at the scheduled time.",
    subSections: [
      { label: "Once live:", items: ["Slideshows", "Rotating campaigns", "Scheduled playlists"] },
      { label: "Hosts simply:", items: ["Keep their device connected", "Allow the system to display content during booked time slots"] }
    ],
    colorClass: "orange",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.345 8.997c5.858-5.857 15.356-5.857 21.213 0" />
  },
  {
    title: "Completion + Verification",
    description: "After completion, delivery is confirmed and transaction is finalized.",
    subSections: [
      { label: "After the scheduled time ends:", items: ["System confirms the campaign ran successfully", "Delivery logs and runtime confirmation are recorded", "Scheduled playlists"] },
      { label: "Then:", items: ["Escrow funds are released to the host", "Platform takes a commission"] }
    ],
    colorClass: "teal",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  }
];

// --- Styles Helper ---

const getColorStyles = (color) => {
  const styles = {
    blue:   { bg: "bg-blue-50/50",   text: "text-blue-600",   glow: "bg-blue-400/40" },
    purple: { bg: "bg-purple-50/50", text: "text-purple-600", glow: "bg-purple-200/40" },
    green:  { bg: "bg-green-50/50",  text: "text-green-600",  glow: "bg-green-200/40" },
    orange: { bg: "bg-orange-50/50", text: "text-orange-500", glow: "bg-orange-100/40" },
    teal:   { bg: "bg-teal-50/50",   text: "text-teal-600",   glow: "bg-teal-200/40" },
  };
  return styles[color] || styles.blue;
};

// --- Main Component ---

const ForAdvertisers = ({ title, subtitle, sections }) => {
  const parseCmsStep = (apiStep, originalStep) => {
    if (!apiStep) return originalStep;
    const desc = apiStep.description || "";
    const lines = desc.split("\n").map(l => l.trim()).filter(Boolean);
    
    if (lines.length === 0) return originalStep;

    const parsed = {
      title: apiStep.title || originalStep.title,
      colorClass: originalStep.colorClass,
      icon: originalStep.icon,
    };

    parsed.description = lines[0];

    const subSections = [];
    let currentGroup = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.endsWith(":") || line.endsWith("?")) {
        if (currentGroup) {
          subSections.push(currentGroup);
        }
        currentGroup = { label: line, items: [] };
      } else {
        if (currentGroup) {
          if (i === lines.length - 1 && !line.includes(":") && (line.startsWith("Users choose") || line.startsWith("Then"))) {
            parsed.footer = line;
          } else {
            currentGroup.items.push(line);
          }
        } else {
          if (i === lines.length - 1) {
            parsed.footer = line;
          } else {
            parsed.description += " " + line;
          }
        }
      }
    }
    if (currentGroup) {
      subSections.push(currentGroup);
    }

    if (subSections.length === 1 && !originalStep.subSections) {
      parsed.listLabel = subSections[0].label;
      parsed.items = subSections[0].items;
    } else if (subSections.length > 0) {
      parsed.subSections = subSections;
    }

    return parsed;
  };

  const steps = sections && sections.length > 0
    ? ADVERTISER_STEPS.map((originalStep, index) => {
        const apiStep = sections.find(s => s.sort_order === index + 1) || sections[index];
        return parseCmsStep(apiStep, originalStep);
      })
    : ADVERTISER_STEPS;

  const headerTitle = title || "For Advertisers";
  const headerSubtitle = subtitle || "Launch your advertising campaigns in five simple steps";

  return (
    <section className="section-padding-x">
      <div className="text-center mb-8 md:mb-16 mt-10 sm:mt-0">
        <h2 className="md:text-4xl text-2xl font-bold mb-2">{headerTitle}</h2>
        <p className="text-slate-500 md:text-lg text-base">{headerSubtitle}</p>
      </div>

      <div className="xl:space-y-12 space-y-6 sm:space-y-8 md:space-y-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const colors = getColorStyles(step.colorClass);

          return (
            <div 
              key={index} 
              className={`relative overflow-hidden bg-white border border-slate-100 rounded-[40px] p-8 md:p-16 flex flex-col items-center justify-between shadow-sm ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Mesh Glow Background */}
              <div className={`absolute -top-10 -left-10 w-64 h-64 ${colors.glow} rounded-full blur-3xl`}></div>

              {/* Text Content */}
              <div className="z-10 md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-600 mb-6">{step.description}</p>
                
                {/* Render Simple List Items if they exist */}
                {step.listLabel && <p className="text-slate-400 font-medium mb-3">{step.listLabel}</p>}
                {step.items && (
                  <ul className="space-y-2 mb-8">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-slate-600 text-sm"><CheckIcon /> {item}</li>
                    ))}
                  </ul>
                )}

                {/* Render Sub-sections (for complex steps 3, 4, 5) */}
                {step.subSections && step.subSections.map((sub, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <p className="text-slate-400 font-medium mb-3">{sub.label}</p>
                    <ul className="space-y-2">
                      {sub.items.map((item, sIdx) => (
                        <li key={sIdx} className="flex items-center text-slate-600 text-sm"><CheckIcon /> {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {step.footer && <p className="text-sm text-slate-400 italic mt-8">{step.footer}</p>}
              </div>

              {/* Icon / Image Content */}
              <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
                <div className={`w-64 h-64 ${colors.bg} rounded-full flex items-center justify-center`}>
                  <svg className={`w-24 h-24 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {step.icon}
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ForAdvertisers;