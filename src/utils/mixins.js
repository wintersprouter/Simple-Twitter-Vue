import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    },
    format(datetime) {
      return datetime ? moment(datetime).format('LLL') : '-'
    }
  }
}
