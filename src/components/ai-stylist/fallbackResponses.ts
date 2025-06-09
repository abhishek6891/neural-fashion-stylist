
export const getFallbackResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('color') || lowerMessage.includes('colour')) {
    return "For color coordination, consider these tips: Stick to a maximum of 3 colors in one outfit. Use the color wheel - complementary colors (opposite on the wheel) create striking looks, while analogous colors (next to each other) create harmony. Neutral colors like black, white, gray, and beige work with almost everything!";
  }
  
  if (lowerMessage.includes('formal') || lowerMessage.includes('business')) {
    return "For formal/business attire: Choose well-fitted pieces in classic colors (navy, black, gray). A blazer instantly elevates any outfit. For men: suit or dress pants with button-down shirt. For women: blazer with dress pants/skirt, or a sheath dress. Always ensure your shoes are polished and professional.";
  }
  
  if (lowerMessage.includes('casual')) {
    return "For casual looks: Dark jeans are versatile and flattering. Layer with cardigans, blazers, or jackets. Choose comfortable but fitted pieces. Mix textures for interest. Sneakers, loafers, or ankle boots work well. Don't forget accessories - they can make a simple outfit look intentional!";
  }
  
  if (lowerMessage.includes('body type') || lowerMessage.includes('figure')) {
    return "Dressing for your body type: Focus on fit over trends. Emphasize your favorite features. A-line cuts flatter most body types. High-waisted bottoms create a longer leg line. V-necks elongate the torso. The most important thing is wearing clothes that make YOU feel confident!";
  }
  
  return "I'd love to help with your style questions! Here are some universal style tips: Invest in quality basics, ensure proper fit, choose a cohesive color palette, and add personality with accessories. What specific style area would you like advice on - colors, occasions, body type, or something else?";
};
