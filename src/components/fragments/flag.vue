<template>
	<span class="flag-icon" :class="icon" :tittle="title || lang" />
</template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator"

	@Component
	export default class Flag extends Vue {
		@Prop({
			type: String,
			default: null
		}) readonly title!: String

		@Prop({
			type: String,
			default: null
		}) readonly lang!: String

		@Prop({
			type: String,
			default: null
		}) readonly squared!: String

		get icon() {
			return ((!!this.squared) ? 'flag-icon-squared ' : '') + 'flag-icon-' + this.lang.toLowerCase()
		}
	}
</script>
