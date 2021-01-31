import Nullstack from 'nullstack';

class MultipleUploadInput extends Nullstack {

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

  async upload({value, event, update}) {
    if(event) {
      const uploads = [];
      for(const file of event.target.files) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async () => {
          const base64 = btoa(reader.result);
          const link = await await this.persist({base64, name: file.name});
          uploads.push(link);
          if(uploads.length == event.target.files.length) {
            update({value: [...value, ...uploads]});
          }
        }
      }
    }
  }

  remove({value, onchange, data}) {
    const delta = value.filter((file) => file != data.file);
    onchange({value: delta});
  }

  renderFile({file, name, clear, class: klasses}) {
    const isImage = (/([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpeg|.gif|.jpg|.webp)$/i).test(file)
    return (
      <div class={klasses.preview}>
        {isImage && <img src={file} alt={name} class={klasses.image} />}
        {!isImage && <a href={file} target="_blank" rel="noopener" class={klasses.file}>{file}</a>}
        {file && <button onclick={this.remove} data-file={file} class={klasses.clear}>{clear}</button>}
      </div>
    )
  }

  render({value, onchange, message, class: klasses}) {
    return (
      <div class={klasses.wrapper}>
        <div class={klasses.previews}>
          {(value || []).map((file) => <File file={file} />)}
        </div>
        <div class={klasses.button}>
          <span class={klasses.message}>{message}</span>
          <input type="file" class={klasses.input} onchange={this.upload} update={onchange} multiple />
        </div>
      </div>
    )
  }

}

export default MultipleUploadInput;