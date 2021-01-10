
document
  = item*

nl
  = '\r\n'
  / '\r'
  / '\n';



item
  = representative
  / break
  / phone
  / fax
  / addr
  / state
  / anything;



break
  = '<br />' nl { return { kind: 'break' } };

phone
  = '<p>(' val:[^<]* '</p>' nl { return { kind: 'phone', val: '(' + val.join('') } };

fax
  = '<p>Fax: ' val:[^<]* '</p>' nl { return { kind: 'fax', val: val.join('') } };

state
  = '<p class="statename">' cval:[^<]* '</p>' nl {
    const jval = cval.join(''),
          val  = jval.substring(0, jval.length-16);
    return { kind: 'statename', val }
  };

addr
  = '<p>' val:[^<]* '</p>' nl { return { kind: 'addr', val: val.join('') } };




representative
  = '<p class="representative">Representative ' val:[^<]* '</p>' nl {
    return {
      kind: 'representative',
      val: val.join('')
    };
  }



anything
  = [^\n]* '\n';
