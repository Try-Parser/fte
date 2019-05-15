<template>
	<v-layout row wrap>
		<v-flex xs12>
			<slot name="input">
				<input :type="setType" :placeholder="label" :class="klass" :value="value" @input="$emit('input', $event.target.value)">
				<slot name="error">
					<span class="error mb-375m">
						{{ setMessage }}
					</span>
				</slot>
			</slot>
		</v-flex>
	</v-layout>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator';

	@Component
	export default class FteInput extends Vue {
		@Prop({ default: "" })
		readonly message!: string

		@Prop({ default: "text" })
		readonly type!: string

		@Prop({ default: "" })
		readonly label!: string

		@Prop({ default: "ebtn" })
		readonly klass!: string

		@Prop() value!: any

		get setType() {
			return this.type
		}

		get setMessage() {
			return this.message
		}
	}
</script>

<style lang="scss">
	@import '@/assets/scss/global.scss'
</style>