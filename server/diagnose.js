/**
 * BikeCare AI Diagnostic Engine
 * Analyzes motorcycle symptoms and returns structured diagnostic recommendations.
 */
export function diagnoseSymptom(bikeId, customBikeName, issue) {
  const text = (issue || "").toLowerCase();

  // Brakes
  if (
    text.includes("brake") ||
    text.includes("lever") ||
    text.includes("stopping") ||
    text.includes("pad") ||
    text.includes("caliper") ||
    text.includes("disc") ||
    text.includes("spongy")
  ) {
    return {
      title: "Your brakes deserve a same-week check",
      summary:
        "Noise or a change in lever feel can point to pad wear, contamination, or air in the line.",
      urgency: "high",
      steps: [
        "Do not ride if the lever feels spongy or braking power has dropped",
        "Check the pad thickness through the caliper window",
        "Book a brake inspection before your next longer ride",
      ],
      estimatedCost: "₹350–₹3,800 depending on pads and fluid",
      bookingRecommended: true,
    };
  }

  // Engine overheating, radiator, coolant, oil
  if (
    text.includes("overheat") ||
    text.includes("hot") ||
    text.includes("coolant") ||
    text.includes("radiator") ||
    text.includes("temperature") ||
    text.includes("oil") ||
    text.includes("smoke") ||
    text.includes("burning")
  ) {
    return {
      title: "Pause the ride and check the essentials",
      summary:
        "Oil or overheating symptoms should be checked before the engine is put under more load.",
      urgency: "high",
      steps: [
        "Switch the engine off and let it cool completely",
        "Check the oil level on level ground and look for leaks",
        "Do not open the radiator cap while the engine is hot",
      ],
      estimatedCost: "₹300–₹2,000 inspection",
      bookingRecommended: true,
    };
  }

  // Battery, starter, ignition, electrical
  if (
    text.includes("battery") ||
    text.includes("crank") ||
    text.includes("start") ||
    text.includes("click") ||
    text.includes("spark") ||
    text.includes("starter") ||
    text.includes("lights") ||
    text.includes("horn") ||
    text.includes("fuse")
  ) {
    return {
      title: "Start with the battery + ignition loop",
      summary:
        "A weak battery, loose terminal, or tired starter relay is the most common cause of a no-start complaint.",
      urgency: "medium",
      steps: [
        "Turn the key on and check whether the dash lights stay bright",
        "Inspect both battery terminals for looseness or white residue",
        "If you hear a single click, book a starter and battery check",
      ],
      estimatedCost: "₹450–₹2,400 depending on the part",
      bookingRecommended: true,
    };
  }

  // Chain, sprocket, drive
  if (
    text.includes("chain") ||
    text.includes("sprocket") ||
    text.includes("slap") ||
    text.includes("drive") ||
    text.includes("slack") ||
    text.includes("tension")
  ) {
    return {
      title: "Inspect your drive chain and sprocket slack",
      summary:
        "A loose, dry, or worn drive chain can slap against the swingarm and compromise acceleration.",
      urgency: "medium",
      steps: [
        "Measure chain free play at the midpoint (typically 20–30 mm)",
        "Clean off road grime with dedicated cleaner and apply motorcycle lube",
        "Check for tight spots or hooked sprocket teeth before adjustment",
      ],
      estimatedCost: "₹250–₹1,800 clean & tension / replacement",
      bookingRecommended: true,
    };
  }

  // Clutch & transmission
  if (
    text.includes("clutch") ||
    text.includes("gear") ||
    text.includes("slip") ||
    text.includes("shift") ||
    text.includes("neutral")
  ) {
    return {
      title: "Check clutch cable play and fluid condition",
      summary:
        "Clutch drag or slipping is often solved with free-play adjustment, but worn friction plates may need replacement.",
      urgency: "medium",
      steps: [
        "Check clutch lever free play at the perch (should be 2–3 mm)",
        "Verify engine oil viscosity and change interval",
        "Avoid slipping the clutch under high rpm in heavy traffic",
      ],
      estimatedCost: "₹200–₹2,800 adjustment or clutch pack",
      bookingRecommended: true,
    };
  }

  // Suspension & tyres
  if (
    text.includes("wobble") ||
    text.includes("fork") ||
    text.includes("tyre") ||
    text.includes("tire") ||
    text.includes("suspension") ||
    text.includes("vibrat") ||
    text.includes("handle")
  ) {
    return {
      title: "Suspension and wheel alignment review",
      summary:
        "Front-end wobbles or uneven handling usually point to improper tyre pressure, unbalanced wheels, or fork seal leaks.",
      urgency: "high",
      steps: [
        "Check cold tyre pressures against manufacturer spec immediately",
        "Inspect front fork stanchions for greasy rings indicating blown seals",
        "Inspect rims for bends and tyres for uneven wear patterns",
      ],
      estimatedCost: "₹400–₹3,200 seals, balancing, or fork overhaul",
      bookingRecommended: true,
    };
  }

  // Default fallback
  return {
    title: "A quick inspection should settle this",
    summary:
      "This symptom deserves a general check across the basics before you ride further.",
    urgency: "medium",
    steps: [
      "Check the battery terminals and main fuse",
      "Look for loose connectors or visible leaks",
      "Avoid long rides until the symptom is understood",
    ],
    estimatedCost: "₹350–₹900 inspection",
    bookingRecommended: true,
  };
}
