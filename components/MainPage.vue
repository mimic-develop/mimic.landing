<template>
  <!-- Header Section -->
  <header class="header">
    <h1 class="logo">MIMIC</h1>
    <div class="header-actions">
      <img
          src="/images/instagram_button.svg"
          alt="Instagram"
          class="instagram-button"
      />
      <div class="app-download-button">
        <span>APP DOWNLOAD</span>
      </div>
    </div>
  </header>

  <!-- Main Content Section -->
  <main class="main-content">
    <div class="main-text">
      <img
          src="/images/third_text.png"
          alt="Third Text"
          class="third-text"
      />
      <p class="my-text">MY</p>
      <p class="place-text">PLACE</p>
      <p class="mimic-main-text">MIMIC</p>
    </div>

    <!-- Background elements or main container -->
    <div class="background-elements">
      <!-- Rectangle 1 -->
      <img
          src="/images/object-1.png"
          alt="Decorative Rectangle 1"
          class="rectangle rectangle-1"
      />
      <!-- Rectangle 2 -->
      <img
          src="/images/object-1.png"
          alt="Decorative Rectangle 2"
          class="rectangle rectangle-2"
      />
    </div>
  </main>
</template>

<style scoped>

/* Background Elements (Rectangles) */
.background-elements {
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rectangle {
  position: absolute;
  object-fit: cover;
  opacity: 0.8;
}

.rectangle-1 {
  width: 120px;
  top: 440px; /* 439.4px */
  right: 120px; /* 545.27px */
  transform: rotate(20deg); /* Static rotation as per user feedback */
}

.rectangle-2 {
  width: 350px; /* 492.08px */
  top: 57px; /* 211.57px (main group y) + 0px (rectangle y relative to main) */
  left: 64px; /* 526.29px (main group x) + 0px (rectangle x relative to main) */
  transform: rotate(-135deg); /* Static rotation as per user feedback */
}


/* Header */
.header {
  position: absolute;
  top: 85px; /* 80.34px */
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.logo {
  font-family: 'Courage', sans-serif;
  font-weight: normal;
  font-size: 42px; /* 42.41px */
  font-style: italic;
  color: #fff;
  letter-spacing: 0.06em;
  margin: 0;
  /* No explicit skew/rotation found in Figma data for the logo itself. */
  /* If the font has a natural tilt, it will be rendered by the font. */
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 29px; /* Adjusted gap based on Figma */
}

.instagram-button {
  width: 38px; /* 38.02px */
  height: 38px; /* 38.02px */
  cursor: pointer;
}

.app-download-button {
  display: flex;
  align-items: center;
  justify-content: center; /* Centering content */
  background-color: #fff;
  color: #000;
  padding: 11px 18px 8px 18px; /* Adjusted padding */
  border-radius: 9999px; /* Full border-radius */
  cursor: pointer;
  font-family: 'Figerona', sans-serif;
  font-weight: 500;
  font-size: 19px; /* 19px */
  letter-spacing: 0.03em;
}

/* Main Content */
.main-content {
  position: relative;
  display: flex;
  width: 800px;
  height: 600px;
  flex-direction: column;
  align-items: flex-start;
  z-index: 5;
  font-size: 82px;
  margin: 0 auto; /* 수평 중앙 정렬 */
}

.main-text {
  position: relative; /* position: absolute 대신 relative 사용 */
  width: 100%;
  height: 100%;
}

.third-text {
  position: absolute;
  width: 261px;
  top: 202px;
  left: 332px;
  color: #BA0C19;
}

.my-text {
  position: absolute;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.03em;
  top: 99px;
  left: 300px;
}

.place-text {
  position: absolute;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.04em;
  top: 304px;
  left: 229px;
}

.mimic-main-text {
  position: absolute;
  font-family: 'Figerona', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.12em;
  top: 408px;
  left: 368px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 2vh;
    top: 2vh;
  }

  .logo {
    font-size: 5vw;
  }

  .header-actions {
    gap: 3vw;
  }

  .instagram-button {
    width: 5vw;
    height: 5vw;
  }

  .app-download-button {
    font-size: 2.5vw;
    padding: 1vw 2vw;
  }

  .app-download-button img {
    width: 3vw;
    height: 3vw;
  }

  .third-text {
    width: 30vw;
    height: auto;
  }

  .my-text, .place-text, .mimic-main-text {
    font-size: 8vw;
  }

  .scroll-navigation-dots {
    display: none;
  }

}
</style>
