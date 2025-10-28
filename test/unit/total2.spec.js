const { total } = require('../../src/total');

describe('Delivery / Rush fee behavior', () => {
  it('applies rush surcharge only once (should not double-charge)', () => {
    const order = {
      items: [
        {
          sku: 'P1-TEST',
          title: 'Test Pack',
          kind: 'frozen',        // frozen to avoid hot-item tax complications
          filling: 'potato',
          qty: 1,
          unitPriceCents: 1000,  // subtotal = 1000
          addOns: []
        }
      ]
    };

    const context = {
      profile: { tier: 'guest' }, // guest threshold = 5000 cents (not met)
      delivery: {
        zone: 'local', // base fee 399
        rush: true     // +299 rush surcharge
      },
      coupon: null
    };

    // Expected: subtotal (1000) + base delivery (399) + rush (299) = 1698
    const expectedTotal = 1000 + 399 + 299;
    const actualTotal = total(order, context);

    expect(actualTotal).toBe(expectedTotal);
  });
});