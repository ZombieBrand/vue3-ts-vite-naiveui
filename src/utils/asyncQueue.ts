/**
 * @description 异步队列
 * @param fun 执行的方法可以是异步
 * @param duration 间隔时间
 * @param immediately 是否立即执行
 */
export default class AsyncQueue {
  // eslint-disable-next-line no-empty-function
  public constructor(private queue: any[] = [], private running: boolean = false) {}

  public push(fun: Function, duration: number, immediately = false) {
    return new Promise((resolve, reject) => {
      // 将传入的fun包装一层,添加队列中
      if (this.queue.length === 0 && immediately) {
        this.queue.push(async () => {
          this.running = true
          try {
            const res = await fun()
            resolve(res)
          } catch (e) {
            reject(e)
          }
          this.running = false
          // 上一个完成后,去除队列中的第一个任务, shift取出队列第一个?.()如果是function则执行
          this.queue.shift()?.()
        })
      } else {
        this.queue.push(async () => {
          this.running = true
          await this.sleep(duration)
          try {
            const res = await fun()
            resolve(res)
          } catch (e) {
            reject(e)
          }
          this.running = false
          // 上一个完成后,去除队列中的第一个任务
          this.queue.shift()?.()
        })
      }
      // 当前是否有任务在执行,没有则取出队列中第一个任务执行
      if (!this.running) {
        console.log(this.queue.length);
        this.queue.shift()?.()
      }
    })
  }

  private sleep(t: number): Promise<any> {
    return new Promise((r) => setTimeout(r, t))
  }
}
