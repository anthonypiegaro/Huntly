import { Row } from "@tanstack/react-table"

import { Fit } from "./columns";
import { NumberFilter } from "./data-table"

const numericComparatorFilter = (
  row: Row<Fit>,
  columnId: string,
  filterValue: NumberFilter
) => {
  const cellValue = row.getValue<number>(columnId);

  if (filterValue.comparator === 'none') {
    return true
  }

  switch (filterValue.comparator) {
    case '>':
      return cellValue > filterValue.value
    case '<':
      return cellValue < filterValue.value
    case '=':
      return cellValue === filterValue.value
    default:
      return true
  }
}

export const filterFns = {
  numericComparator: numericComparatorFilter,
}