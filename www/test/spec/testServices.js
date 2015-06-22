
// Hymns
describe("hymn service", function() {

  var hymnService;

  beforeEach( module("councilsApp") );
  beforeEach( inject( function( HymnService ) {
    hymnService = HymnService;
  }))

  it('should return all hymns', function() {
    var hymns = hymnService.getList();
    expect( hymns[0] ).toEqual("The Morning Breaks");
    expect( hymns[340] ).toEqual("God Save the King");
  });

  it('should return first and last hymn', function() {
    expect( hymnService.getHymn(1) ).toEqual("The Morning Breaks");
    expect( hymnService.getHymn(341) ).toEqual("God Save the King");
  });

  it('should return an error string', function() {
    expect( hymnService.getHymn(0) ).toEqual("Invalid Hymn Number (0)");
    expect( hymnService.getHymn(342) ).toEqual("Invalid Hymn Number (342)");
  });
})
