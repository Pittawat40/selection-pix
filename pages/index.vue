<script setup lang="ts">
const { projects, categories } = useProjects();
const activeCategory = ref("All");
const selectedSlug = ref<string | null>(null);
const heroSrc = ref("/images/5.png");

const filtered = computed(() =>
  activeCategory.value === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory.value),
);

const selectedProject = computed(
  () => projects.find((p) => p.slug === selectedSlug.value) ?? null,
);

const openProject = (slug: string) => {
  selectedSlug.value = slug;
};
const closeProject = () => {
  selectedSlug.value = null;
};

// Lightbox
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
};
const closeLightbox = () => {
  lightboxOpen.value = false;
};
const prevImage = () => {
  if (!selectedProject.value) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + selectedProject.value.images.length) %
    selectedProject.value.images.length;
};
const nextImage = () => {
  if (!selectedProject.value) return;
  lightboxIndex.value =
    (lightboxIndex.value + 1) % selectedProject.value.images.length;
};

// Parallax & Scroll Elements
const heroMedia = ref<HTMLElement | null>(null);

// 📌 1. ประกาศตัวแปรสำหรับผูก Ref และคุมสเตทการทำงานของกลุ่มข้อความใน Sidebar
const sidebarContent = ref<HTMLElement | null>(null);
const isSidebarVisible = ref(false);

onMounted(() => {
  const handleScroll = () => {
    if (!heroMedia.value) return;
    if (window.scrollY < window.innerHeight) {
      heroMedia.value.style.transform = `translateY(${window.scrollY * 0.42}px)`;
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  // 📌 2. สร้าง Intersection Observer เพื่อแอบส่องว่า Sidebar เลื่อนพ้นหน้า Hero ลงมาหรือยัง
  const observer = new IntersectionObserver(
    ([entry]) => {
      // ทันทีที่ส่วนของ Works เข้ามาอยู่ในจอเกิน 5% ตัวแปรจะเปลี่ยนเป็น true ตลอดไป (Fade แล้วเปิดทิ้งไว้เลย)
      if (entry.isIntersecting) {
        isSidebarVisible.value = true;
        observer.disconnect(); // ทำงานเสร็จแล้วสั่งปลดตัวส่องเพื่อประหยัด RAM เครื่อง
      }
    },
    { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
  );

  if (sidebarContent.value) {
    observer.observe(sidebarContent.value);
  }

  const handleKey = (e: KeyboardEvent) => {
    if (lightboxOpen.value) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    } else if (selectedSlug.value) {
      if (e.key === "Escape") closeProject();
    }
  };
  window.addEventListener("keydown", handleKey);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", handleKey);
    observer.disconnect();
  });
});

// Lock body scroll เมื่อ dialog เปิด
watch(selectedSlug, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});
</script>

<template>
  <div>
    <section class="relative h-screen overflow-hidden">
      <div
        ref="heroMedia"
        class="absolute left-0 right-0 will-change-transform"
        style="top: -15%; height: 130%"
      >
        <NuxtImg
          :src="heroSrc"
          alt="Hero Cover"
          class="w-full h-full object-cover"
          style="object-position: center 25%"
          loading="eager"
          format="webp"
        />
        <div
          class="absolute inset-0"
          style="
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.15) 0%,
              rgba(0, 0, 0, 0.05) 35%,
              rgba(0, 0, 0, 0.62) 100%
            );
          "
        />
      </div>

      <div
        class="absolute bottom-11 left-10 right-10 z-10 flex items-end justify-between"
      >
        <div class="flex flex-col gap-1">
          <span
            class="text-[14px] font-medium tracking-[0.26em] uppercase text-white/30"
          >
            Photography · Videography
          </span>
          <p
            class="text-[16px] font-light tracking-[0.05em] text-white/55 leading-relaxed"
          >
            Real Estate &amp; Architecture<br />Bangkok, Thailand
          </p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div
            class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
          <span
            class="text-[8px] tracking-[0.3em] uppercase text-white/30 [writing-mode:vertical-rl]"
          >
            Scroll
          </span>
        </div>
      </div>
    </section>

    <section id="works" class="flex border-t border-[#E6E6E4] scroll-mt-[58px]">
      <aside class="hidden md:block w-[300px] shrink-0 relative">
        <div
          ref="sidebarContent"
          :class="[
            'sticky top-[58px] p-10 flex flex-col justify-between h-[calc(100vh-58px)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]',
            isSidebarVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          ]"
        >
          <div class="flex flex-col gap-8">
            <span
              class="text-[10px] font-medium tracking-[0.24em] uppercase text-[#999999]"
              >Selected Works</span
            >
            <div
              class="flex flex-col gap-1 text-[22px] font-light leading-snug tracking-[-0.01em] text-[#111111]"
            >
              <span>Every space</span><span>has a story</span>
              <em class="font-light not-italic text-[#999999]">worth seeing</em>
            </div>
            <span class="text-[11px] text-[#CCCCCC] tracking-[0.06em]"
              >{{ projects.length }} Projects</span
            >
          </div>
          <div class="flex flex-col gap-5 pt-8 border-t border-[#E6E6E4]/60">
            <div class="flex flex-col gap-1">
              <span
                class="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#999999]"
                >Email</span
              >
              <a
                href="mailto:hello@gmail.com"
                class="text-[12px] font-light text-[#555555] hover:text-[#111111] transition-colors break-all"
                >hello@gmail.com</a
              >
            </div>
            <div class="flex flex-col gap-2.5">
              <span
                class="text-[9px] font-semibold tracking-[0.2em] uppercase text-[#999999]"
              >
                Contact
              </span>
              <div class="flex items-center gap-7 text-[#555555]">
                <a
                  href="https://facebook.com/yourpage"
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  class="hover:text-[#111111] transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    class="w-[15px] h-[15px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    />
                  </svg>
                </a>

                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  class="hover:text-[#111111] transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    class="w-[15px] h-[15px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener"
                  aria-label="YouTube"
                  class="hover:text-[#111111] transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    class="w-[15px] h-[15px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6 .46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
                    />
                    <polygon
                      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    />
                  </svg>
                </a>

                <a
                  href="https://tiktok.com/@yourprofile"
                  target="_blank"
                  rel="noopener"
                  aria-label="TikTok"
                  class="hover:text-[#111111] transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    class="w-[14px] h-[14px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex-1 p-4 md:p-10">
        <div
          class="flex gap-8 mb-4 md:mb-8 border-b border-[#E6E6E4] pb-3 overflow-x-auto"
        >
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'text-[12px] tracking-[0.08em] whitespace-nowrap bg-transparent cursor-pointer font-sans transition-all duration-200 border-none p-0 relative -bottom-[13px] pb-3',
              activeCategory === cat
                ? 'text-[#111111] font-medium border-b-2 border-[#111111]'
                : 'text-[#999999] hover:text-[#111111] font-normal border-b-2 border-transparent',
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-[4px] md:gap-[20px]">
          <div
            v-for="project in filtered"
            :key="project.id"
            @click="openProject(project.slug)"
            class="proj-card relative overflow-hidden rounded-none md:rounded bg-[#E6E6E4] block aspect-[4/3] group cursor-pointer"
          >
            <NuxtImg
              :src="project.cover"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              loading="lazy"
              placeholder
              format="webp"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300 flex flex-col justify-end p-4 md:p-5"
            >
              <div
                class="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              >
                <p
                  class="text-white text-[13px] md:text-[15px] font-medium leading-snug tracking-[0.02em]"
                >
                  {{ project.title }}
                </p>
                <p class="text-white/60 text-[10px] tracking-[0.06em] mt-1">
                  {{ project.location }} · {{ project.category }}
                </p>
                <div
                  class="flex gap-3 mt-2 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75"
                >
                  <span
                    class="flex items-center gap-1 text-white/55 text-[10px]"
                  >
                    <svg
                      class="w-[10px] h-[10px]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
                      />
                    </svg>
                    {{ project.views }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-[400] bg-black/90 flex flex-col justify-start overflow-y-auto"
        >
          <div
            class="absolute top-0 left-0 right-0 h-[60px] px-6 md:px-10 flex items-center justify-end z-50 shrink-0"
          >
            <button
              @click="closeProject"
              class="w-10 h-10 text-[18px] font-light text-white/60 hover:text-white hover:bg-white/10 active:scale-95 rounded-full transition-all duration-200 bg-transparent border-none cursor-pointer flex items-center justify-center leading-none"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          <div
            class="w-full max-w-5xl mx-auto mt-6 mb-0 md:mt-12 md:mb-0 px-4 md:px-0 flex-1 animate-zoom-in"
          >
            <div class="w-full flex flex-col items-start text-center mb-6">
              <span
                class="text-[10px] md:text-[11px] font-medium tracking-[0.24em] uppercase text-white/40 mb-3"
              >
                {{ selectedProject.category }}
              </span>
              <h1
                class="text-[28px] md:text-[42px] font-light tracking-[0.02em] leading-tight text-white uppercase mb-4 max-w-3xl"
              >
                {{ selectedProject.title }}
              </h1>
              <p
                class="text-[12px] md:text-[13px] text-white tracking-[0.08em] font-light"
              >
                Location : {{ selectedProject.location }}
              </p>
              <div class="w-12 h-px bg-white/20 mt-2" />
            </div>

            <div class="bg-white rounded-sm shadow-2xl overflow-hidden">
              <div class="flex flex-col gap-4 p-4 md:p-8 bg-white">
                <div
                  v-for="(image, index) in selectedProject.images"
                  :key="index"
                  class="w-full cursor-zoom-in group relative overflow-hidden rounded-sm"
                  @click="openLightbox(index)"
                >
                  <NuxtImg
                    :src="image.src"
                    :alt="image.alt"
                    class="w-full block object-cover transition-transform duration-700 group-hover:scale-[1.005]"
                    loading="lazy"
                    placeholder
                    format="webp"
                    style="max-height: 90vh; width: 100%"
                  />
                  <div
                    class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <p
                      class="text-white/80 text-[11px] tracking-[0.08em] font-sans"
                    >
                      {{ image.alt }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="px-6 py-8 md:px-12 flex justify-between items-center bg-white"
              >
                <button
                  @click="closeProject"
                  class="text-[11px] font-medium tracking-[0.14em] uppercase text-[#999999] hover:text-[#111111] transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
                >
                  ← Back to Gallery
                </button>
                <span
                  class="text-[11px] text-[#CCCCCC] tracking-[0.08em] font-mono"
                >
                  Total: {{ selectedProject.images.length }} Photos
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div
          v-if="lightboxOpen && selectedProject"
          class="fixed inset-0 z-[500] bg-black/90 flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <button
            @click="closeLightbox"
            class="absolute top-6 right-8 text-white/40 hover:text-white text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 font-sans bg-transparent border-none cursor-pointer"
          >
            Close ✕
          </button>
          <span
            class="absolute top-7 left-1/2 -translate-x-1/2 text-white/30 text-[10px] tracking-[0.16em]"
            >{{ lightboxIndex + 1 }} / {{ selectedProject.images.length }}</span
          >
          <NuxtImg
            :src="selectedProject.images[lightboxIndex].src"
            :alt="selectedProject.images[lightboxIndex].alt"
            class="max-w-[90vw] max-h-[88vh] object-contain"
            format="webp"
          />
          <button
            @click="prevImage"
            class="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            @click="nextImage"
            class="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes zoomIn {
  from {
    transform: scale(0.97);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-zoom-in {
  animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

body[style*="overflow: hidden"] header,
body[style*="overflow: hidden"] nav {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  transition: opacity 0.2s ease;
}
</style>