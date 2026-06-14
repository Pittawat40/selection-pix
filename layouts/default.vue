<script setup lang="ts">
const isScrolled = ref(false);

const displayText = ref("");
const doneTyping = ref(false);
const fullText = "Selection Pix";

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 40;
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  let i = 0;
  const type = () => {
    if (i < fullText.length) {
      displayText.value += fullText[i];
      i++;
      setTimeout(type, 90); // ความเร็วในการพิมพ์ (มิลลิวินาทีต่อตัวอักษร)
    } else {
      doneTyping.value = true; // พิมพ์เสร็จแล้ว ให้สั่งซ่อนคอร์เซอร์
    }
  };
  setTimeout(type, 500); // ดีเลย์เปิดหน้าเว็บทิ้งไว้แป๊บหนึ่งก่อนเริ่มพิมพ์
});
</script>

<template>
  <div>
    <nav
      :class="[
        'fixed top-0 left-0 right-0 z-[300] h-[58px] flex items-center justify-between px-10 transition-all duration-500',
        isScrolled
          ? 'bg-white border-b border-[#E6E6E4]'
          : 'bg-transparent border-b border-transparent',
      ]"
    >
      <NuxtLink to="/" class="flex items-center">
        <span
          :class="[
            'text-[14px] font-medium tracking-[0.22em] uppercase transition-colors duration-500',
            isScrolled ? 'text-[#111111]' : 'text-white/90',
          ]"
        >
          {{ displayText }}
        </span>

        <span
          v-if="!doneTyping"
          :class="[
            'text-[14px] font-light ml-0.5 tracking-normal cursor-blink',
            isScrolled ? 'text-[#111111]' : 'text-white/90',
          ]"
        >
          |
        </span>
      </NuxtLink>

      <div class="flex items-center gap-8">
        <ul class="hidden md:flex gap-7 list-none">
          <li>
            <NuxtLink
              to="/#works"
              :class="[
                'text-[14px] font-normal tracking-[0.06em] transition-colors duration-300',
                isScrolled
                  ? 'text-[#999999] hover:text-[#111111]'
                  : 'text-white/55 hover:text-white/95',
              ]"
            >
              Works
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/#footer"
              :class="[
                'text-[14px] font-normal tracking-[0.06em] transition-colors duration-300',
                isScrolled
                  ? 'text-[#999999] hover:text-[#111111]'
                  : 'text-white/55 hover:text-white/95',
              ]"
            >
              Contact
            </NuxtLink>
          </li>
        </ul>
        <a
          href="https://www.instagram.com/selectionpix"
          target="_blank"
          :class="[
            'text-[10px] font-medium tracking-[0.16em] uppercase transition-colors duration-300',
            isScrolled
              ? 'text-[#999999] hover:text-[#111111]'
              : 'text-white/40 hover:text-white/90',
          ]"
        >
          Instagram ↗
        </a>
      </div>
    </nav>

    <slot />

    <footer id="footer" class="bg-black text-white">
      <div
        class="px-10 py-5 border-t border-white/8 flex justify-between items-center"
      >
        <span class="text-[10px] text-white/80 tracking-[0.06em]">
          © 2026 Selection Pix. All rights reserved.
        </span>
        <span class="text-[10px] text-white/80 tracking-[0.1em] uppercase">
          Bangkok · Thailand
        </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* คลาสสำหรับสไตล์แท่งกะพริบพิมพ์ดีด */
.cursor-blink {
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
