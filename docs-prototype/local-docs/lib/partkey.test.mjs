import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partKey } from './partkey.mjs';
test('spelling variants of a screw share one key', () => {
  for (const s of ['M5x8 mm screw', 'M5x8mm screws', 'M5 x 8 mm screw', 'm5×8 mm Screw (4x)']) assert.equal(partKey(s), 'm5x8 mm screw');
});
test('aliases map onto the canonical key', () => {
  assert.equal(partKey('Micro-Lock cable', { 'micro-lock cable': 'microlock cable' }), 'microlock cable');
});
test('distinct parts stay distinct', () => {
  assert.notEqual(partKey('C+ contacts'), partKey('C- contacts'));
  assert.notEqual(partKey('M5x8 mm screw'), partKey('M5x12 mm screw'));
});
