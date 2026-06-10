import {
  BottleIcon,
  GlassIcon,
  CanIcon,
  CardIcon,
  CashIcon,
  CouponIcon,
} from "./icons";

// Maps packaging/return-form ids (from mock data) to their icon components so
// the sheets and the report forms stay visually consistent.
export const PACKAGING_ICONS = {
  plastik: BottleIcon,
  szklo: GlassIcon,
  puszki: CanIcon,
};

export const RETURN_FORM_ICONS = {
  karta: CardIcon,
  gotowka: CashIcon,
  kupon: CouponIcon,
};

export function packagingIcon(id, props) {
  const Icon = PACKAGING_ICONS[id];
  return Icon ? <Icon {...props} /> : null;
}

export function returnFormIcon(id, props) {
  const Icon = RETURN_FORM_ICONS[id];
  return Icon ? <Icon {...props} /> : null;
}
