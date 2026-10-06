(function(root){
  function rows(d){return [['Request',d.request],['Trip',d.trip],['Route',d.route||'To discuss'],['Dates',d.flexible?'Flexible / to discuss':`${d.start} to ${d.end}`],['Group',`${d.adults} adult(s), ${d.children} child(ren)`],['Name',d.name],['Phone / WhatsApp',d.phone],['Email',d.email||'Not provided'],['Pickup',d.pickup||'To discuss'],['Total group budget',d.budget?`${d.currency} ${d.budget}`:'Please advise'],['Stay preference',d.stay],['Notes',d.notes||'None']];}
  function message(d){return `Hello K2! I’d like to make a ${d.request.toLowerCase()}.\n\n`+rows(d).map(([k,v])=>`${k}: ${v}`).join('\n')+'\n\nPlease confirm availability, the total price and next steps.';}
  function dateError(d,today){if(d.request==='Quote request'&&d.flexible)return '';if(!d.start||!d.end)return 'Please choose your start and end dates.';if(d.start<today)return 'Please choose a start date from today onwards.';if(d.end<d.start)return 'The end date must be on or after the start date.';return '';}
  root.K2Booking={rows,message,dateError};if(typeof module!=='undefined')module.exports=root.K2Booking;
})(typeof window!=='undefined'?window:globalThis);
