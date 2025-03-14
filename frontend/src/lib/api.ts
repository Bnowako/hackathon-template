import { toast } from "sonner";
import createClient from "openapi-fetch";
import { paths } from "./types";
import { ExampleResponse, PostExampleRequest, PutExampleRequest } from "./apiTypes";

const client = createClient<paths>({baseUrl: '/api'});


export const handleApiError = (error: unknown) => {  
    // @ts-expect-error hack to handle error
    const message = error?.message || 'An unexpected error occurred'; 
    toast.error(message);
    throw error;
};

export async function getExamples(): Promise<ExampleResponse[]> {
    const { data, error } = await client.GET("/examples/");
    if (error) handleApiError(error);
    if (!data) throw new Error("No data returned");
    return data as ExampleResponse[];
};

export async function getExample(exampleId: string): Promise<ExampleResponse> {
    const { data, error } = await client.GET("/examples/{example_id}", {params: {path: {example_id: exampleId}}});
    if (error) handleApiError(error);
    if (!data) throw new Error("No data returned");
    return data as ExampleResponse;
};
  
export async function createExample(example: PostExampleRequest): Promise<ExampleResponse> {
    const { data, error } = await client.POST("/examples/", {body: example});
    if (error) handleApiError(error);
    if (!data) throw new Error("No data returned");
    return data as ExampleResponse;
};

export async function updateExample(exampleId: string, example: PutExampleRequest): Promise<ExampleResponse> {
    const { data, error } = await client.PUT("/examples/{example_id}", {params: {path: {example_id: exampleId}}, body: example});
    if (error) handleApiError(error);
    if (!data) throw new Error("No data returned");
    return data as ExampleResponse;
};

export async function deleteExample(exampleId: string): Promise<void> {
    const { error } = await client.DELETE("/examples/{example_id}", {params: {path: {example_id: exampleId}}});
    if (error) handleApiError(error);
};