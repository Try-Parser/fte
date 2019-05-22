<template>
	<v-layout row wrap>
		<v-flex xs12>
			<form>
				<slot></slot>
			</form>
		</v-flex>
	</v-layout>
</template>


<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class FTEForm extends Vue {	
		obj: any = {}

		validate() {
			let success: boolean = true,
				elem: any = this.$slots.default;

			elem.forEach((instance: any) => {
				if(instance.componentOptions.tag == "e-input") {
					let inst = instance.componentInstance
					if(inst.kv) {
						this.obj[inst.kv] = inst.value
					}
					if(inst.hasError) {
						inst.validate();
						success = false;
					}
				}
			}) 

			return success;
		}

		gen() {
			return this.obj
		}
	}
</script>

<style lang="scss"></style>