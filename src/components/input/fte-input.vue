<template>
	<div>
		<slot name="input">
			<div class="input-container">
				<textarea v-if="type === 'textarea'" :rows="row" class="ta" :class="klass" :cols="col" :value="value" @input="$emit('input', $event.target.value)"></textarea>
				<input v-else :type="setType" :placeholder="label" :class="klass" :value="value" @input="$emit('input', $event.target.value)">
				<v-icon class="pos" :class="getClassIcon" :color="icon" @click="showTip = !showTip" ref="ticon">{{ icon }}</v-icon>
				<div v-if="!mobileOnly && hasError && !mobile && showTip">
					<v-tooltip 
						:right  = "tooltip.right"
						:left   = "tooltip.left"
						:bottom = "tooltip.bottom"
						:top    = "tooltip.top"
						color="white" 
						:content-class="klasstip" 
						v-model="showTip"
						eager>
							<template v-slot:activator="{ on }">
								<v-icon></v-icon>
							</template>
							<slot name="error">
								<span class="error mb-375m">
									<div v-for="msg in setMessage">
										{{ msg }}
									</div>
								</span>
							</slot>					
					</v-tooltip>
				</div>
			</div>
			<div v-show="mobileOnly || (hasError && mobile && showTip)">
				<slot name="error">
					<span class="error mb-375m mobile">
						<div v-for="msg in setMessage">
							{{ msg }}
						</div>
					</span>
				</slot>
			</div>
		</slot>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

	@Component
	export default class FTEInput extends Vue {
		@Prop({ default: "4" }) readonly row!: string
		@Prop({ default: "50" }) readonly col!: string

		@Prop({ default: false }) readonly mobileOnly!: boolean
		@Prop() readonly kv!: string     
		@Prop({ default: "right" }) readonly tip!: string
		@Prop({ default: Array }) readonly rules!: any[]
		@Prop({ default: "text" }) readonly type!: string
		@Prop({ default: "" }) readonly label!: string
		@Prop({ default: "e-field" }) readonly klass!: string	

		@Prop({ default: "" }) value!: any

		get setType() {
			return this.type
		}

		get setMessage() {
			return this.errorMsgList
		}

		tooltip: any = {
			right  : <boolean> false,
			left   : <boolean> false,
			bottom : <boolean> false,
			top    : <boolean> false
		}

		klasstip: string = "tooltip-right"

		errorMsgList: any = []
		ic: string = "info"
		hasError: boolean = false
		showTip: boolean = false
		resizedId: any = ''
		mobile: boolean = false
		txa: string = ''

		get icon() {
			return (this.rules.length) ? this.ic: "";
		}

		get getClassIcon() {
			console.log(this.type)
			return (this.type == "textarea") ? 'txa' : '';
		}

		validate() {
			this.showTip = false
			this.errorMsgList = []
			this.hasError = false
			this.showTip = false

			this.rules.forEach((fun: any) => {
				let error = fun(this.value)
				if(typeof error != "boolean") {
					this.errorMsgList.push(error)
					this.hasError = true
				}
			})

			setTimeout(() => {
				if(this.hasError) {
					this.ic = "error"
					this.showTip = true
				} else {
					this.ic = "check_circle"
				}
			}, 10)
		}

		@Watch('value') 
		check(n: any, o:any) {
			this.validate()
		}

		restartTip() {
			if(window.innerWidth < 1024) {
				this.mobile = true 
			} else {
				this.mobile = false
				if(this.hasError) {
					this.showTip = !this.showTip
				}
			}
		}

		resize(event: any) {
			if(this.showTip || window.innerWidth < 1024) {
				this.showTip = false
			}
			clearTimeout(this.resizedId)
			this.resizedId = setTimeout(this.restartTip, 500)
		}

		get checkTip() {
			if(this.tip) {
				this.tooltip[this.tip] = true;
				this.klasstip = "tooltip-" + this.tip
			}
			return true;
		}

		mounted() {
			this.checkTip

			this.$nextTick(() => {
				window.addEventListener('resize', this.resize)
			})
			this.restartTip()
		}

		beforeDestroy() {
			window.removeEventListener('resize', this.resize)
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/global.scss';

	.input {
		&-container {
  			display: -ms-flexbox; 
  			display: flex;			
  			width: 100%;
  			position: relative;
		}
	}

	.pos {
	    position: absolute;
	    right: 1%;
	    top: 15%;

	    &.txa {
	    	top: 5px !important;
	    }
	}

	.error {
		color: red !important;
		background: white !important;
		&.mobile {
			font-size: 12px;
		}
	}

	.info {
		background: white !important;
	}

	.check_circle {
		color: green !important;
		background: white !important;
	}

	.tooltip {
		&-top, &-right, &-bottom, &-left {
			&::after {
				content: "";
			    position: absolute;
			    border-style: solid;
				border-width: 5px;
			}
		}

		&-top::after {
			top: 100%;
			left: 50%;
			margin-left: -5px;
		   	border-color: #555 transparent transparent transparent;
		}

		&-right::after {
		    top: 50%;
		    right: 100%;
		    margin-top: -5px;
		   	border-color: transparent #555 transparent transparent;
		}

		&-bottom::after {
			bottom: 100%;
    		left: 50%;
    		margin-left: -5px;
    		border-color: transparent transparent #555 transparent;
		}

		&-left::after {
			top: 50%;
		    left: 100%;
		    margin-top: -5px;
		   	border-color: transparent transparent transparent #555;
		}
	}
</style>