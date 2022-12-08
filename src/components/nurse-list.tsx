// Import deps
import React from 'react';

// Import components
import { NurseListRow } from './nurses-list-row';

// Import styles
import './../styles/nurse-list.css';

// Create interfaces
interface NurseUI {
  id: number;
  firstName: string;
  lastName: string;
  ward: string;
  email: string;
}

interface NurseListUI {
  nurses: NurseUI[];
  loading: boolean;
  handleNurseRemove: (id: number) => void;
  handleNurseEdit: (id: number, firstName: string, lastName: string, email: string, ward:string) => void;
}

// Create NurseList component
export const NurseList = (props: NurseListUI) => {
  // Show loading message
  if (props.loading) return <p>Nurses table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Name</th>

            <th className="table-head-item">Employee ID</th>

            <th className="table-head-item">Ward</th>

            <th className="table-head-item">Email</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.nurses.length > 0 ? (
            props.nurses.map((nurse: NurseUI, idx) => (
              <NurseListRow
                key={nurse.id}
                nurse={nurse}
                position={idx + 1}
                handleNurseRemove={props.handleNurseRemove}
                handleNurseEdit={props.handleNurseEdit}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no nurses to show!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}