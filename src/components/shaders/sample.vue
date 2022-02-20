<template>

<span>

    <!-- old parchment effect-->
      <svg class="d-none">
        <filter id="old-paper-shader">
            <feTurbulence x="0" y="0" baseFrequency="0.01" numOctaves="5" seed="1"> </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20"></feDisplacementMap>
        </filter>
      </svg>

    <!-- wave effect-->
      <svg class="d-none">
        <filter width="100%" height="100%" x="0%" y="0%" id="waving-noise-shader">            
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="5" result="turbulence" seed="5">
                <animate attributeName="baseFrequency" values=".01;.02;.01;.02;.01" dur="100s" repeatCount="indefinite"></animate>
            </feTurbulence>
            
            <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
        </filter>
      </svg>

      <svg class="d-none">
        <filter width="100%" height="100%" x="0%" y="0%" id="waving-flag-shader">            
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="5" result="turbulence" seed="5">
                <animate attributeName="baseFrequency" values=".001;.002;.001;.002;.001" dur="50s" repeatCount="indefinite"></animate>
            </feTurbulence>
            
            <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
        </filter>
      </svg>

</span>
</template>
