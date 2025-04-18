export const getFinalMarkerElement = () => {
  const element = document.createElement("div");
  element.innerHTML = `
    <div class="floating-marker">
      <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
        <path d="M40.2297 18.8587C40.2297 26.1778 31.3358 36.6131 26.0478 42.1707C23.9395 44.3866 20.4987 44.3866 18.3903 42.1707C13.1024 36.6131 4.2085 26.1778 4.2085 18.8587C4.2085 8.44334 12.2721 0 22.2191 0C32.166 0 40.2297 8.44334 40.2297 18.8587Z" fill="#F73418"/>
        <path d="M14.8387 16.9275C13.3973 13.7929 16.6334 10.5569 19.7679 11.9982L20.5874 12.375C21.5729 12.8282 22.7072 12.8282 23.6926 12.375L24.5121 11.9982C27.6467 10.5569 30.8827 13.7929 29.4414 16.9275L29.0646 17.7469C28.6114 18.7324 28.6114 19.8667 29.0646 20.8522L29.4414 21.6717C30.8827 24.8062 27.6467 28.0422 24.5121 26.6009L23.6926 26.2241C22.7072 25.771 21.5729 25.771 20.5874 26.2241L19.7679 26.6009C16.6334 28.0422 13.3973 24.8062 14.8387 21.6717L15.2155 20.8522C15.6686 19.8667 15.6686 18.7324 15.2155 17.7469L14.8387 16.9275Z" fill="white"/>
      </svg>
    </div>
    
    <style>
      .floating-marker {
        animation: float 2s ease-in-out infinite;
      }
      
      @keyframes float {
        0% {
          transform: translateY(0px);
          filter: drop-shadow(0 5px 8px rgba(0,0,0,0.3));
        }
        50% {
          transform: translateY(-8px);
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2));
        }
        100% {
          transform: translateY(0px);
          filter: drop-shadow(0 5px 8px rgba(0,0,0,0.3));
        }
      }
    </style>
  `;
  element.style.zIndex = "2";
  element.style.position = "relative";
  return element;
};

export default getFinalMarkerElement;
