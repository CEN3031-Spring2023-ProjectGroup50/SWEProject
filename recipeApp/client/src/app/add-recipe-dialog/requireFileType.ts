import { AbstractControl, FormControl } from "@angular/forms";
export function requiredFileType(type: string) {
  return (control: FormControl) =>{
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() == extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }
      return false;
    }
    return false;
  };
}