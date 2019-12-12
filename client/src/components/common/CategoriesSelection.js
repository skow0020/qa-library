import { Col, FormSelect } from "shards-react";

import React from 'react';
import { Store } from "../../flux";

const CategoriesSelection = (props) => {
  return (
    <Col >
      <label className="text-muted font-weight-bold px-2" htmlFor="category">Categories</label>
      <FormSelect id="category" type="text" {...props}>
        {Store.getCategoryOptions().map((category, idx) => (
          <option key={`category-option-${idx}`}>{category}</option>
        ))}
      </FormSelect>
    </Col>
  );
};

export default CategoriesSelection;