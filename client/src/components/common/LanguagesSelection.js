import { Col, FormSelect } from "shards-react";

import React from 'react';
import { Store } from "../../flux";

const LanguagesSelection = (props) => {
  return (
    <Col>
      <label className="text-muted font-weight-bold px-2" htmlFor="language">Languages</label>
      <FormSelect id="language" type="text" {...props}>
        {Store.getLanguages().map((option, idx) => (
          <option key={`language-option-${idx}`}>{option.name}</option>
        ))}
      </FormSelect>
    </Col>
  );
};

export default LanguagesSelection;