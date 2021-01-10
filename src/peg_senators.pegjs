
document
  = block*

nl
  = '\r\n'
  / '\r'
  / '\n';


block
  = senator:senator break? addr:addr_block* { return { senator: senator.val, office: addr }; };

addr_block
  = al:addr_line* ph:phone* fx:fax* break { return {
      addr  : al.map(l => l.val),
      phone : ph.length === 0? undefined : ph.map(p => p.val),
      fax   : fx.length === 0? undefined : fx.map(f => f.val)
    } };



break
  = '<br />' nl { return { kind: 'break' } };

phone
  = '<p>(' val:[^<]* '</p>' nl { return { kind: 'phone', val: '(' + val.join('') } };

fax
  = '<p>Fax: ' val:[^<]* '</p>' nl { return { kind: 'fax', val: val.join('') } };

addr_line
  = '<p>' fl:[A-Z0-9] val:[^<]* '</p>' nl { return { kind: 'addr', val: fl + val.join('') } };



senator
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
