# fte guides

## Example Code

```
<e-form ref="ezForm">
  <e-input v-model="firstname" 
           kv="first_name" 
           :value="firstname" 
           label="Firstname" 
           :rules="[]" 
           klass="sample class" 
           type="text">
  </e-input>
</e-form>

let form = this.$refs.ezForm

if(form.validate()) {
  console.log(form.gen())
}
 ```


## Example Rules

```
const defaultRule:any = [
	(v:any) => !!v || 'Field is required',
	(v:any) => (v && v.length <= 1024) || 'Name must be less than 1024 characters'
]

const emailRule: any = [
	(v: any) => !!v || 'E-mail is required',
	(v: any) => /.+@.+/.test(v) || 'E-mail must be valid'
]

const emptyRule: any = [
	(v: any) => !!v || 'Field is required',
]

const uuidRule: any = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
```
