import { LogisticOperatorResponse } from "./logistic-operator";

export interface SimulationResponse {
  id: number;
  clientName: string;
  productHeight: number;
  productWidth: number;
  productDepth: number;
  productWeight: number;
  toAddress: string;
  fromAddress: string;
  distance: number;
  fasterOperator: LogisticOperatorResponse;
  cheaperOperator: LogisticOperatorResponse;
}

export interface SimulationAPIResponse {
  statusCode: number;
  data: SimulationResponse;
}

export interface SimulationRequest {
  clientName: string;
  toAddress: string;
  fromAddress: string;
  productHeight: number;
  productWidth: number;
  productDepth: number;
  productWeight: number;
}
