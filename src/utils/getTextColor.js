export const getTextColor = (bgColor) => {
    if (!bgColor) return "#000"; // Default to black if no color is provided
  
    // Convert hex to RGB
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000" : "#fff"; // Use black text for bright colors, white text for dark colors
  };
  