```
import ajax from './ajax';
```
```
    async nextStepVerfi() {
      try {
        const vstatus = await ajax.get('/apis/initmerchant/verify-status', {});
      } catch (error) {
        message.error(error.msg || error.message || error);
      }
    }
```