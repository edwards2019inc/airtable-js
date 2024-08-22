class AirtableRequestBuilder{
  constructor(base, table){
    this.base = base;
    this.fields = [];
    this.maxRecords = 0;
    this.filterByFormula = [];
    this.table = table;
  }
  addField(field){
    this.fields.push(field);
    return this;
  }
  
  setMaxRecords(maxRecords){
    this.maxRecords = maxRecords;
    return this;
  }
  setView(view){
    this.view = view;
    return this;
  }
  setFilterFormula(filterFormula){
    this.filterByFormula=filterFormula;
    return this;
  }

  build(){
      var url = "https://api.airtable.com/v0/" + this.base + "/" + this.table + "?";
      var params = {};
      if(this.fields.length > 0) params.fields = this.fields;
      if(this.maxRecords > 0) params.maxRecords = this.maxRecords;
      if(this.view != "") params.view = this.view;
      if(this.filterByFormula != "") params.filterByFormula = this.filterByFormula;
      url = url + param(params);
      return url;
  }

}
function testAirtableRequestBuilder(){
  var url = new AirtableRequestBuilder(airtableBase,"Passengers").addField("PassengerName").addField("PassengerNumber").setFilterFormula("FIND('Mary',{PassengerName}) > 0").setMaxRecords(10).build();
  console.log(url);
}
function airtableFetch(apiKey, url){
  let headers = {
    "Authorization":"Bearer " + apiKey
  }
  let options = {
    headers:headers,
    method:"GET"
  }
  //console.log(url);
  let response = UrlFetchApp.fetch(url,options).getContentText();
  let result = JSON.parse(response);
  return result;
}
