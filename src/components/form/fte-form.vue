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
		success: boolean = true
		
		validate() {
			this.success = true
			let elem: any = this.$slots.default;

			elem.forEach((instance: any) => {
				this.recurCheck(instance)				
			}) 

			return this.success;
		}

		recurCheck(instance: any) {
			if(/FTEInput/.test(instance.tag)) {
				this.executeValidation(instance)
			} else {
				let child = instance.children

				if(child && child.length > 0) {
					child.forEach((ch: any) => {
						if(/FTEInput/.test(ch.tag)) {
							this.executeValidation(ch)
						} else {
							this.recurCheck(ch)
						}
					})
				}
			}
		}


		executeValidation(instance: any) {
			let inst = instance.componentInstance
			if(inst.kv) {
				this.obj[inst.kv] = inst.value
			}

			inst.validate();

			if(inst.hasError) {
				this.success = false;
			}
		}

		gen() {
			return this.obj
		}
	}
</script>

<style lang="scss"></style>