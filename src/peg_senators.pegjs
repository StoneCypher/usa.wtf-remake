
document
  = item*

nl
  = '\r\n'
  / '\r'
  / '\n';

item
  = '<p class="senator">' [0-9]* ') SENATOR ' val:[^<]* '</p>' nl {
    return {
      kind: 'senator',
      val: val.join('')
              .toLowerCase()
              .split(' ')
              .map(word => `${word[0].toUpperCase()}${word.substring(1)}`)
              .join(' ')
    };
  }
  / anything;

anything
  = [^\n]* '\n';
