/**
 * Spotlight effect utility
 * Creates a dynamic light effect that follows the mouse cursor
 * over designated elements.
 */

interface SpotlightOptions {
  size?: number;       // Size of the spotlight
  intensity?: number;  // Light intensity
  color?: string;      // Spotlight color
  followCursor?: boolean; // Whether spotlight follows cursor or is fixed
  easing?: number;     // Movement easing (lower = smoother)
}

/**
 * Applies a spotlight effect to an element
 */
export const applySpotlight = (
    element: HTMLElement,
    options: SpotlightOptions = {}
) => {
  const {
    size = 300,
    intensity = 0.6,
    color = 'rgba(255, 255, 255, 0.8)',
    followCursor = true,
    easing = 0.2
  } = options;

  // Store initial element style for cleanup
  const originalPosition = element.style.position;
  const originalOverflow = element.style.overflow;

  // Ensure the element has relative positioning for proper spotlight positioning
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  element.style.overflow = 'hidden';

  // Create spotlight element
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight-effect';
  spotlight.style.position = 'absolute';
  spotlight.style.pointerEvents = 'none';
  spotlight.style.width = `${size}px`;
  spotlight.style.height = `${size}px`;
  spotlight.style.borderRadius = '50%';
  spotlight.style.background = `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`;
  spotlight.style.opacity = `${intensity}`;
  spotlight.style.transform = 'translate(-50%, -50%)';
  spotlight.style.zIndex = '1';
  spotlight.style.mixBlendMode = 'overlay';
  spotlight.style.willChange = 'transform, left, top';

  // Add spotlight to element
  element.appendChild(spotlight);

  // Current position
  let currentX = element.offsetWidth / 2;
  let currentY = element.offsetHeight / 2;
  let targetX = currentX;
  let targetY = currentY;

  // Animation frame
  let animationFrameId: number;

  // Update spotlight position
  const updatePosition = () => {
    if (followCursor) {
      // Move towards target with easing
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      // Apply position
      spotlight.style.left = `${currentX}px`;
      spotlight.style.top = `${currentY}px`;

      // Continue animation loop
      animationFrameId = requestAnimationFrame(updatePosition);
    }
  };

  // Start animation
  updatePosition();

  // Track mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    // Get mouse position relative to element
    const rect = element.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  };

  // Add event listener
  if (followCursor) {
    element.addEventListener('mousemove', handleMouseMove);
  } else {
    // For fixed position, just center it
    spotlight.style.left = `${element.offsetWidth / 2}px`;
    spotlight.style.top = `${element.offsetHeight / 2}px`;
  }

  // Return cleanup function
  return () => {
    if (followCursor) {
      element.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    }
    element.removeChild(spotlight);
    element.style.position = originalPosition;
    element.style.overflow = originalOverflow;
  };
};

/**
 * Creates spotlight effect for multiple elements
 */
export const initializeSpotlights = (
    selector: string,
    options?: SpotlightOptions
): (() => void) => {
  const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
  const cleanupFunctions: (() => void)[] = [];

  elements.forEach(element => {
    const cleanup = applySpotlight(element, options);
    cleanupFunctions.push(cleanup);
  });

  // Return combined cleanup function
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};

/**
 * Fix for specific spotlight issues on different browsers and devices
 */
export const fixSpotlightRendering = () => {
  // Detect if device is likely mobile/tablet (no hover capability)
  const isMobile = window.matchMedia("(hover: none)").matches;

  if (isMobile) {
    // Don't apply spotlights on mobile devices
    return () => {}; // Return empty cleanup function
  }

  // Detect browser for specific fixes
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Different options based on browser
  const options: SpotlightOptions = {
    size: 300,
    intensity: isSafari ? 0.5 : 0.6, // Safari needs lower intensity
    easing: isFirefox ? 0.15 : 0.2,  // Firefox needs slower easing
  };

  // Apply spotlights to service cards
  return initializeSpotlights('.service-card', options);
};

export default fixSpotlightRendering;