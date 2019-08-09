<template>
	<div>
		<slot name="input">
			<div class="input-container">
				<div @click="pickedFile" class="e-field file text-center" v-show="imgUrl">
					<v-progress-circular indeterminate color="primary" v-if="load"/>
					<div v-else>
						{{ filename }}   
						<v-icon class="pos" dark>remove</v-icon>
						<v-divider class="my-2"></v-divider>
						<img class="img" :src="imgUrl"/>
	          		</div>
	          	</div>
				<div class="dropbox e-field file" v-show="imgUrl == ''">
					<input type="file" accept="image/*" ref="image" class="input-file" @change="onFilePicked" />
					<p>
						<v-icon x-large> {{ icon }} </v-icon>
						<br> {{ label }}
					</p>
				</div>
			</div>
          </v-overlay>
		</slot>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator';

	@Component
	export default class FTEFile extends Vue {
		@Prop({ default: "Upload file" }) readonly label!: string
		@Prop({ default: "cloud_download" }) readonly icon!: string
		@Prop({ default: require('@/assets/img/folder.png') }) readonly image!: string

		imgUrl: any = ""
		file: any = null
		filename: string = ""
		load: boolean = true

		pickedFile() {
			(this.$refs.image as any).click()
		}

		onFilePicked(event:any) {
			let files: FileList = event.target.files

			if(files.length == 0) {
				this.imgUrl = ''
				this.file = null
				this.$emit("input", this.file)
			} else {
				let file: File = files[0]
				if(file !== undefined) {
					if(file.name.lastIndexOf('.') <= 0) {
						return
					} else {
						this.file = file
						let reader: FileReader = new FileReader()
						reader.readAsDataURL(file)
						reader.onload = this.onload
					}
				}
			}

		}

		onload(e: any) {
			this.load = false
			if(this.file.type === "image/jpeg" || this.file.type === "image/png")
				this.imgUrl = e.target.result
			else
				this.imgUrl = this.image
			console.log(this.file)
			this.filename = this.file.name
			this.$emit("input", this.file)
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/scss/global.scss';

	.input-container {

		.remove {
			border-radius: 28px;
			background-color: #ebeff2;
		}

		.img {
			width: 100%;
			border-radius: 28px
		}

		.input-file {
		    opacity: 0; 
		    width: 100%;
		    height: 190px;
		    position: absolute;
		    cursor: pointer;
		}

		.dropbox {
		    background: #f4f6f6;
		    color: dimgray;
		    padding: 10px 10px;
		    min-height: 190px; 
		    position: relative;
		    cursor: pointer;

		    &:hover {
			    background: #ECEFEF; 
			}

			p {
			    font-size: 1.2em;
			    text-align: center;
			    padding: 50px 0;
			}
		} 
	}
</style>