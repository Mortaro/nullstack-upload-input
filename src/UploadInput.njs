import Nullstack from 'nullstack';

class UploadInput extends Nullstack {

  static async persist({base64, name}) {
    const {existsSync, mkdirSync, writeFileSync} = await import('fs');
    const target = 'public/uploads';
    let file = Buffer.from(base64, 'base64');
    if (!existsSync(target)) {
      mkdirSync(target);
    }
    const key = `${target}/${new Date().getTime()}-${name}`;
    writeFileSync(key, file);
    return key.replace('public', '');
  }

  async upload({event, update}) {
    if(event) {
      for(const file of event.target.files) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async () => {
          const base64 = btoa(reader.result);
          const value = await this.persist({base64, name: file.name});
          update({value});
          event.target.value = '';
        };
      }
    }
  }

  clear({onchange}) {
    onchange({value: ''});
  }

  render({value, name, onchange, message, clear, class: klasses}) {
    const isImage = (/([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpeg|.gif|.jpg|.webp)$/i).test(value)
    return (
      <div class={klasses.wrapper}>
        <div class={klasses.preview}>
          {isImage && <img src={value} alt={name} class={klasses.image} />}
          {!isImage && <a href={value} target="_blank" rel="noopener" class={klasses.file}>{value}</a>}
        </div>
        <div class={klasses.button}>
          <span class={klasses.message}>{message}</span>
          <input type="file" class={klasses.input} onchange={this.upload} update={onchange} />
        </div>
        {!!value && <button onclick={this.clear} class={klasses.clear}>{clear}</button>}
      </div>
    )
  }

}

export default UploadInput;