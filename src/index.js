/**
 * Imports
 */

import is from '@weo-edu/is'
import toPromise from 'to-promise'

/**
 * gen-mapP
 */

 function mapP (p, it, ...args) {
   return new Promise(function(resolve, reject) {
     if (is.function(it)) it = it(...args)
     if (!it || !is.function(it.next)) return resolve(it)

     var onFulfilled = iter('next')
     var onRejected = iter('throw')

     onFulfilled()

     function next (ret) {
       if (ret.done) return resolve(ret.value)
       toPromise(p(ret.value)).then(onFulfilled, onRejected)
     }

     function iter (attr) {
       return function(res) {
         var ret
         try {
           ret = it[attr](res)
         } catch (e) {
           return reject(e)
         }
         next(ret)
       }

     }
   })
 }

/**
 * Exports
 */

export default mapP
