
{

  const rotate_state_into_reps = (state, reps) =>
    reps.map(rep => {
      const decorated_rep = rep;
      decorated_rep.state = state;
      return decorated_rep;
    });

}



document
  = sb:stateblock* { return [].concat(... sb); }

nl
  = '\r\n'
  / '\r'
  / '\n';



stateblock
  = s:state break? b:block* { return rotate_state_into_reps(s.val, b); };

block
  = r:representative break? addr:addr_block* { return { representative: r.val, office: addr }; };

addr_block
  = al:addr_line* ph:phone* fx:fax* break { return {
      addr  : al.map(l => l.val),
      phone : ph.length === 0? undefined : ph.map(p => p.val),
      fax   : fx.length === 0? undefined : fx.map(f => f.val)
    } };



break
  = '<br />' nl { return { kind: 'break' } };

phone
  = '<p>(' d1:[0-9] d2:[0-9] d3:[0-9] ')' ' '?
           d4:[0-9] d5:[0-9] d6:[0-9] '-'?
           d7:[0-9] d8:[0-9] d9:[0-9] d0:[0-9]
  val:[^<]* '</p>' nl { return {
    kind : 'phone',
    val  : `(${d1}${d2}${d3}) ${d3}${d3}${d3}-${d3}${d3}${d3}${d3}`
  } };

fax
  = '<p>Fax: ' val:[^<]* '</p>' nl { return { kind: 'fax', val: val.join('') } };

state
  = '<p class="statename">' cval:[^<]* '</p>' nl {
    const jval = cval.join('')
                     .toLowerCase(),
          lval = jval.substring(0, jval.length-16),
          val  = lval.split(' ')
                     .map(word => `${word[0].toUpperCase()}${word.substring(1)}`)
                     .join(' ');
    return { kind: 'statename', val }
  };

addr_line
  = '<p>' fl: [^(]             val:[^<]* '</p>' nl { return { kind: 'addr', val: fl      + val.join('') } }
  / '<p>' fl: '(' sl: [a-zA-Z] val:[^<]* '</p>' nl { return { kind: 'addr', val: fl + sl + val.join('') } };




representative
  = '<p class="representative">Representative ' val:[^<]* '</p>' nl {
    return {
      kind: 'representative',
      val: val.join('')
    };
  }
