<template>
  <div class="w-7/12 mx-auto py-16">
    <form
      v-if="!isSubscribed"
      id="my-form"
      ref="myForm"
      @submit.prevent="subscribe"
    >
      <div class="text-3xl font-bold text-center mb-4">Scenario 1</div>
      <div class="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter your first name"
          data-recurly="first_name"
          class="rounded border border-gray-400 focus:border-gray-700 px-4 py-2 focus:outline-none"
          v-model="firstName"
        />
        <input
          type="text"
          placeholder="Enter your last name"
          data-recurly="last_name"
          class="rounded border border-gray-400 focus:border-gray-700 px-4 py-2 focus:outline-none"
          v-model="lastName"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          v-model="email"
          class="rounded border border-gray-400 focus:border-gray-700 px-4 py-2 focus:outline-none"
        />

        <div id="recurly-elements">
          <!-- Recurly Elements will be attached here -->
        </div>
      </div>

      <!-- Recurly.js will update this field automatically -->
      <input type="hidden" name="recurly-token" data-recurly="token" />

      <div class="mt-4 flex justify-center">
        <button
          class="bg-green-500 font-bold text-center text-white py-3 px-6 rounded"
        >
          Subscribe - $50
        </button>
      </div>
    </form>
    <div v-else>Subscribed!</div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
const config = useRuntimeConfig();

const myForm = ref(null);
const email: Ref<string> = ref("");
const firstName: Ref<string> = ref("");
const lastName: Ref<string> = ref("");
const isSubscribed: Ref<boolean> = ref(false);
let elements;

onMounted(() => {
  window.recurly.configure(config.RECURLY_PUBLIC_KEY);
  elements = window.recurly.Elements();
  const cardElement = elements.CardElement();
  cardElement.attach("#recurly-elements");
});

const subscribe = async () => {
  window.recurly.token(elements, myForm.value, async function (err, token) {
    if (err) return;
    console.log(token);
    window.fpr("referral", { email: email.value });
    const res = await fetch("/api/sc1/subscribe", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        token,
      }),
      headers: {
        "x-api-key": config.FIRSTPROMOTER_API_KEY,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    isSubscribed.value = true;
  });
};
</script>

<style>
.recurly-element {
  height: 42px;
  margin: 0;
  border-color: rgb(133, 133, 133);
}

.recurly-element-focus,
.recurly-hosted-field-focus {
  border-color: rgb(55, 65, 81);
}
</style>
