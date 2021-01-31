
# Nullstack Upload Input

Simple input that uploads files to public/uploads.

## Install

```bash
npm install --save nullstack-upload-input
```

## Usage with one way binding

```jsx
import Nullstack from 'nullstack';
import {UploadInput} from 'nullstack-upload-input';

class Application extends Nullstack {

  link = '';

  updateLink({value}) {
    this.link = value;
  }

  render() {
    return (
      <UploadInput name="link" value={this.link} onchange={this.updateLink} />
    )
  }

}

export default Application;
```

## Usage with two way binding

```jsx
import Nullstack from 'nullstack';
import {UploadInput} from 'nullstack-upload-input';

class Application extends Nullstack {

  link = '';

  render() {
    return (
      <UploadInput bind={this.link} />
    )
  }

}

export default Application;
```

## Multiple Upload Input

```jsx
import Nullstack from 'nullstack';
import {MultipleUploadInput} from 'nullstack-upload-input';

class Application extends Nullstack {

  links = [];

  render() {
    return (
      <MultipleUploadInput bind={this.link} />
    )
  }

}

export default Application;
```

## Customization

You can customize the following attributes:

```jsx
import Nullstack from 'nullstack';
import {UploadInput} from 'nullstack-upload-input';

class Application extends Nullstack {

  links = [];

  render() {
    return (
      <UploadInput
        bind={this.link} 
        class={{
          wrapper: "", 
          button: "",
          message: "",
          previews: "",
          preview: "",
          image: "",
          file: "",
          input: "",
          clear: ""
        }}
        message="Select a File"
        clear="Remove File"
      />
    )
  }

}
```

## License

Nullstack Upload Input is released under the [MIT License](https://opensource.org/licenses/MIT).