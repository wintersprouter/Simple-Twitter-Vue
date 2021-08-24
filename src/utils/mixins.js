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
export const tweetFilter = {
  filters: {
    preview(tweet) {
      if (tweet.length > 50) {
        return tweet.substring(0, 50) + '...'
      } else {
        return tweet
      }
    }
  }
}
