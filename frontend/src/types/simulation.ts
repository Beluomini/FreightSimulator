import { LogisticOperatorResponse } from "./logistic-operator";

export interface SimulationResponse {
  id: number;
  clientName: string;
  productHeight: number;
  productWidth: number;
  productLength: number;
  toAddress: string;
  fromAddress: string;
  distance: number;
  fasterOperator: LogisticOperatorResponse;
  fasterOperatorTime: number;
  fasterOperatorPrice: number;
  cheaperOperator: LogisticOperatorResponse;
  cheaperOperatorTime: number;
  cheaperOperatorPrice: number;
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
  productLength: number;
}
