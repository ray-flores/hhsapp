// Import deps
import React from 'react';

// Create interfaces
interface NurseListRowUI {
  position: number;
  nurse: {
    id: number;
    firstName: string;
    lastName: string;
    ward: string;
    email: string;
  }
  handleNurseRemove: (id: number) => void;
  handleNurseEdit: (id: number, firstName: string, lastName: string, email: string, ward:string) => void;
}

// Create NurseListRow component
export const NurseListRow = (props: NurseListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.nurse.firstName} {props.nurse.lastName}
    </td>

    <td className="table-item">
      {props.nurse.id}
    </td>

    <td className="table-item">
      {props.nurse.ward}
    </td>

    <td className="table-item">
      {props.nurse.email}
    </td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleNurseRemove(props.nurse.id)}>
        Delete nurse
      </button>
    </td>
    <td className="table-item">
      <button
        className="btn btn-update"
        onClick={() => props.handleNurseEdit(props.nurse.id, props.nurse.firstName, props.nurse.lastName, props.nurse.email, props.nurse.ward )}>
        Edit nurse
      </button>
    </td>
  </tr>
)