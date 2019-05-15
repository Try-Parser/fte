<template>
  <div class="home">
  	<e-input v-model="test"></e-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import eInput from '@/components/input/fte-input.vue';


@Component({
	components: {
		"e-input": eInput
	}
})
export default class Home extends Vue {
	test: string = "frank"
}
</script>
