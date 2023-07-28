import React, { Component } from "react";

import SpreadSheetTable from 'react-jsonschema-table'

const schema = {
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    lastName: {
      type: "string",
      title: "LastName"
    },
    email: {
      type: "string",
      format: "email",
      title: "Email"
    }
  }
};

const UIschema = {
    title: 'Users',
    fields: {
      firstName: {
        width: 300,
      },
      lastName: {
        width: 300,
      },
      email: {
        width: 300,
      }
    },
    list: ['email', 'firstName', 'lastName'],
    editor: {
      settings: {
        sections: [
          {
            name: 'Personal Data',
            fields: [
              'firstName',
              'email',
              'lastName',
            ],
          },
        ],
      },
    },
  }

const items = [{
    virtualId: 0, // integer
    document: { // actual document
      name: 'Jhon',
      lastName: 'Doe',
      email: 'jhon@doe.com',
      id: '2a08db19-894c-4d1a-82b6-f4abe2ebbe33'
    }, // compliant to schema, you can have extra fields, they will not show on the Table but will be considered in callbacks
    status: 'loaded' // string (one of 'loaded', 'loading', 'lazzy','new','invalid')
  }]

export class DynamciTable extends Component {
  render() {
    return  <SpreadSheetTable schema={schema} UIschema={UIschema} items={items} />
  }
}
