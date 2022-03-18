<template>
  <Head>
    <Script>
      (function (w) { w.fpr = w.fpr || function () { w.fpr.q = w.fpr.q || [];
      w.fpr.q[arguments[0] == "set" ? "unshift" : "push"](arguments); };
      })(window); fpr("init", { cid: "8xz6ftbb" }); fpr("click")
    </Script>
    <Script src="https://cdn.firstpromoter.com/fpr.js" async></Script>
  </Head>
  <div>Scenario 1</div>
  <form @submit.prevent="subscribe" v-if="!isSubscribed">
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Enter your email address"
      v-model="email"
    />
    <div>
      <button>Subscribe - $50</button>
    </div>
  </form>
  <div v-else>Subscribed!</div>
</template>
<script setup lang="ts">
import { ref, Ref } from "vue";
const config = useRuntimeConfig();

const email: Ref<string> = ref("");
const isSubscribed: Ref<boolean> = ref(false);

const subscribe = async () => {
  window.fpr("referral", { email: email.value });

  const res = await fetch("https://firstpromoter.com/api/v1/track/sale", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      plan: "sc1-50",
      amount: 50 * 100,
      currency: "USD",
    }),
    headers: {
      "x-api-key": config.FIRSTPROMOTER_API_KEY,
      "Content-Type": "application/json",
    },
  });

  console.log(res);
  isSubscribed.value = true;
};
</script>
